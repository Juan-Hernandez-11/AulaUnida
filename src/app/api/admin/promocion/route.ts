import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/admin/promocion?anio=2026&grado=10&seccion=A
 * Obtiene estudiantes del año (con filtros opcionales por grado y sección).
 * Agrupa ciclos del mismo año (ej: 2026A + 2026B) y calcula promedio del año completo.
 * Query params:
 *   - anio: string (obligatorio, ej: "2026")
 *   - grado: string (opcional, ej: "10")
 *   - seccion: string (opcional, ej: "A")
 * Responde: [{ 
 *   estudianteId, 
 *   nombre, 
 *   documento, 
 *   gradoActual { id, nombre, seccion },
 *   promedioGeneral: number
 * }]
 */
export async function GET(req: NextRequest) {
  try {
    const anio = req.nextUrl.searchParams.get('anio');
    if (!anio) {
      return NextResponse.json({ error: 'anio es requerido (ej: 2026)' }, { status: 400 });
    }

    const gradoNombre = req.nextUrl.searchParams.get('grado'); // opcional
    const seccion = req.nextUrl.searchParams.get('seccion'); // opcional

    // Obtener todos los ciclos del año
    const ciclosDelAnio = await prisma.ciclo.findMany({
      where: {
        nombre: { contains: anio }
      }
    });

    if (ciclosDelAnio.length === 0) {
      return NextResponse.json({ error: `No hay ciclos para el año ${anio}` }, { status: 404 });
    }

    const cicloIds = ciclosDelAnio.map(c => c.id);

    // Construir where clause dinámico
    const whereClause: any = { cicloId: { in: cicloIds } };
    if (gradoNombre) {
      whereClause.nombre = gradoNombre;
    }
    if (seccion) {
      whereClause.seccion = seccion;
    }

    // Obtener grados (con filtros si existen)
    const grados = await prisma.grado.findMany({
      where: whereClause,
      include: {
        estudiantes: {
          include: {
            estudiante: {
              select: {
                id: true,
                name: true,
                documentNumber: true,
                maxGradoAlcanzadoId: true
              }
            }
          }
        }
      }
    });

    // Construir lista de estudiantes con sus promedios del año completo
    const estudiantesMap = new Map();
    
    for (const grado of grados) {
      for (const matricula of grado.estudiantes) {
        const estudiante = matricula.estudiante;
        const key = estudiante.id;

        if (!estudiantesMap.has(key)) {
          // Calcular promedio general del estudiante para TODOS los ciclos del año
          const notasDetalles = await prisma.notaDetalle.findMany({
            where: {
              estudianteId: estudiante.id,
              periodo: {
                cicloId: { in: cicloIds }
              }
            }
          });

          // Calcular promedio ponderado general del año completo
          let promedioGeneral = 0;
          if (notasDetalles.length > 0) {
            const totalPeso = notasDetalles.reduce((sum, n) => sum + n.peso, 0);
            const sumaValoresPeso = notasDetalles.reduce((sum, n) => sum + (n.valor * n.peso), 0);
            promedioGeneral = totalPeso > 0 ? sumaValoresPeso / totalPeso / 100 : 0;
          }

          estudiantesMap.set(key, {
            estudianteId: estudiante.id,
            nombre: estudiante.name || 'Sin nombre',
            documento: estudiante.documentNumber || 'N/A',
            gradoActual: {
              id: grado.id,
              nombre: grado.nombre,
              seccion: grado.seccion
            },
            promedioGeneral: parseFloat(promedioGeneral.toFixed(2)),
            maxGradoAlcanzadoId: estudiante.maxGradoAlcanzadoId
          });
        }
      }
    }

    const estudiantes = Array.from(estudiantesMap.values());
    return NextResponse.json(estudiantes);
  } catch (error) {
    console.error('Error en GET /api/admin/promocion:', error);
    return NextResponse.json({ error: 'Error al obtener estudiantes para promoción' }, { status: 500 });
  }
}

/**
 * POST /api/admin/promocion
 * Promociona un estudiante al siguiente grado.
 * Body: { estudianteId: number, accion: 'paso' | 'perdio' }
 * Responde: { ok: true, mensaje: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { estudianteId, accion } = await req.json();

    if (!estudianteId || typeof estudianteId !== 'number') {
      return NextResponse.json({ error: 'estudianteId inválido' }, { status: 400 });
    }

    if (accion !== 'paso' && accion !== 'perdio') {
      return NextResponse.json({ error: 'accion debe ser "paso" o "perdio"' }, { status: 400 });
    }

    // Obtener el estudiante
    const estudiante = await prisma.user.findUnique({
      where: { id: estudianteId },
      include: {
        estudianteGrados: {
          include: { grado: { include: { ciclo: true } } }
        }
      }
    });

    if (!estudiante) {
      return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 });
    }

    if (estudiante.role !== 'STUDENT') {
      return NextResponse.json({ error: 'El usuario no es estudiante' }, { status: 400 });
    }

    // Obtener el grado actual
    if (estudiante.estudianteGrados.length === 0) {
      return NextResponse.json({ error: 'Estudiante no está matriculado en ningún grado' }, { status: 400 });
    }

    const gradoActual = estudiante.estudianteGrados[0].grado;

    if (accion === 'paso') {
      // Obtener el siguiente grado (mismo ciclo, número superior)
      const siguienteGrado = await prisma.grado.findFirst({
        where: {
          cicloId: gradoActual.cicloId,
          id: { gt: gradoActual.id }
        },
        orderBy: { id: 'asc' }
      });

      if (!siguienteGrado) {
        return NextResponse.json({ error: 'No existe grado superior en este ciclo' }, { status: 400 });
      }

      // Desmatricular del grado actual
      await prisma.gradoEstudiante.deleteMany({
        where: {
          estudianteId,
          gradoId: gradoActual.id
        }
      });

      // Matricular en el siguiente grado (sin sección)
      // Buscar grado sin sección (sección vacía)
      const gradoSinSeccion = await prisma.grado.findFirst({
        where: {
          id: siguienteGrado.id,
          seccion: ''
        }
      });

      if (!gradoSinSeccion) {
        // Si no existe, crear uno o usar el existente
        // Por ahora, usamos el siguiente grado encontrado
        await prisma.gradoEstudiante.create({
          data: {
            estudianteId,
            gradoId: siguienteGrado.id
          }
        });
      } else {
        await prisma.gradoEstudiante.create({
          data: {
            estudianteId,
            gradoId: gradoSinSeccion.id
          }
        });
      }

      // Actualizar maxGradoAlcanzadoId
      await prisma.user.update({
        where: { id: estudianteId },
        data: { maxGradoAlcanzadoId: siguienteGrado.id }
      });

      return NextResponse.json({
        ok: true,
        mensaje: `Estudiante promovido a ${siguienteGrado.nombre}`
      });
    } else if (accion === 'perdio') {
      // El estudiante se queda en el mismo grado (sin cambios en la matrícula)
      // Podría limpiar notas o marcar algo, pero por ahora solo confirmamos
      return NextResponse.json({
        ok: true,
        mensaje: `Estudiante permanecerá en ${gradoActual.nombre}`
      });
    }

  } catch (error) {
    console.error('Error en POST /api/admin/promocion:', error);
    return NextResponse.json({ error: 'Error al procesar promoción' }, { status: 500 });
  }
}
