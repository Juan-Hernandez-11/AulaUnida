
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// GET: Devuelve los estudiantes de un grado/asignatura si el docente tiene esa asignación
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);
    // Busca el usuario en la base de datos y verifica el rol
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, email: true, role: true },
    });
    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }
    const docenteId = user.id;
    const { searchParams } = new URL(req.url);
    const gradoId = Number(searchParams.get('gradoId'));
    const materiaId = Number(searchParams.get('materiaId'));
    if (!gradoId || !materiaId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
    // Validar asignación: buscar MateriaGrado y luego MateriaGradoDocente
    const materiaGrado = await prisma.materiaGrado.findFirst({
      where: { gradoId, materiaId },
    });
    if (!materiaGrado) {
      return NextResponse.json({ error: 'No existe esa asignación grado/materia' }, { status: 404 });
    }
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: { docenteId, materiaGradoId: materiaGrado.id },
    });
    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para este grupo/materia' }, { status: 403 });
    }
    // Buscar estudiantes matriculados en el grado
    const estudiantes = await prisma.gradoEstudiante.findMany({
      where: { gradoId },
      include: { 
        estudiante: {
          include: {
            notasMateriaPeriodo: {
              where: { materiaId },
              include: {
                periodo: true
              }
            }
          }
        }
      },
    });

    // Calcular promedio acumulado para cada estudiante
    const estudiantesConPromedio = estudiantes.map((ge: any) => {
      const estudiante = ge.estudiante;
      const todasLasNotas = estudiante.notasMateriaPeriodo;
      
      // Agrupar notas por período
      const notasPorPeriodo = todasLasNotas.reduce((acc: any, nota: any) => {
        if (!acc[nota.periodo.id]) {
          acc[nota.periodo.id] = {
            periodo: nota.periodo,
            notas: []
          };
        }
        acc[nota.periodo.id].notas.push(nota);
        return acc;
      }, {});

      // Calcular promedio por período y luego promedio general
      let sumaPromediosPeriodos = 0;
      let periodosConNotas = 0;

      Object.values(notasPorPeriodo).forEach((periodoData: any) => {
        const notasDelPeriodo = periodoData.notas;
        if (notasDelPeriodo.length > 0) {
          const promedioPeriodo = notasDelPeriodo.reduce((sum: number, nota: any) => sum + nota.valor, 0) / notasDelPeriodo.length;
          sumaPromediosPeriodos += promedioPeriodo;
          periodosConNotas++;
        }
      });

      const promedioGeneral = periodosConNotas > 0 ? sumaPromediosPeriodos / periodosConNotas : 0;
      
      return {
        id: estudiante.id,
        name: estudiante.name,
        email: estudiante.email,
        notasPorPeriodo: notasPorPeriodo,
        promedio: Number(promedioGeneral.toFixed(2)),
        totalNotas: todasLasNotas.length,
        periodosConNotas: periodosConNotas
      };
    });

    return NextResponse.json(estudiantesConPromedio);
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
