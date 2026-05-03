import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/admin/asignaturas/promedios?estudianteId=1&periodoId=2
 * Calcula los promedios de asignatura para un estudiante en un periodo
 * Agrupa las notas de materias que pertenecen a la misma asignatura
 * Query params:
 *   - estudianteId: number (requerido)
 *   - periodoId: number (requerido)
 * Responde: [{ 
 *   asignatura { id, nombre }, 
 *   promedioAsignatura: number,
 *   materias: [{ id, nombre, nota: number }]
 * }]
 */
export async function GET(req: NextRequest) {
  try {
    const estudianteId = req.nextUrl.searchParams.get('estudianteId');
    const periodoId = req.nextUrl.searchParams.get('periodoId');

    if (!estudianteId || !periodoId) {
      return NextResponse.json(
        { error: 'estudianteId y periodoId son requeridos' },
        { status: 400 }
      );
    }

    // Obtener todas las asignaturas con sus materias
    const asignaturas = await prisma.asignatura.findMany({
      include: {
        materias: {
          select: { id: true, nombre: true }
        }
      }
    });

    // Para cada asignatura, calcular el promedio de sus materias
    const resultado = [];
    
    for (const asignatura of asignaturas) {
      if (asignatura.materias.length === 0) continue;

      // Obtener notas de todas las materias de esta asignatura para este estudiante en este periodo
      const notasMaterias = await prisma.notaMateriaPeriodo.findMany({
        where: {
          estudianteId: Number(estudianteId),
          periodoId: Number(periodoId),
          materiaId: { in: asignatura.materias.map(m => m.id) }
        },
        include: {
          materia: { select: { id: true, nombre: true } }
        }
      });

      if (notasMaterias.length > 0) {
        // Calcular promedio de las materias de la asignatura
        const sumaNotas = notasMaterias.reduce((sum, n) => sum + n.valor, 0);
        const promedioAsignatura = sumaNotas / notasMaterias.length;

        resultado.push({
          asignatura: {
            id: asignatura.id,
            nombre: asignatura.nombre
          },
          promedioAsignatura: parseFloat(promedioAsignatura.toFixed(2)),
          materias: notasMaterias.map(nm => ({
            id: nm.materiaId,
            nombre: nm.materia.nombre,
            nota: nm.valor
          }))
        });
      }
    }

    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Error en GET /api/admin/asignaturas/promedios:', error);
    return NextResponse.json({ error: 'Error al calcular promedios' }, { status: 500 });
  }
}
