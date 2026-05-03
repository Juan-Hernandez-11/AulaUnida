import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { prisma } from '@/lib/prisma';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

initFirebaseAdmin();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    // Obtener usuario de la BD
    const user = await prisma.user.findUnique({
      where: { firebaseUid: userId },
      select: { id: true }
    });

    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Obtener el mes y año de la query (por defecto el mes actual)
    const searchParams = request.nextUrl.searchParams;
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    
    const now = new Date();
    const year = yearParam ? parseInt(yearParam) : now.getFullYear();
    const month = monthParam ? parseInt(monthParam) : now.getMonth() + 1;

    // Definir rango de fechas para el mes
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Obtener asistencias del mes
    const asistencias = await prisma.asistencia.findMany({
      where: {
        estudianteId: user.id,
        fecha: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        materia: {
          select: {
            id: true,
            nombre: true
          }
        }
      },
      orderBy: {
        fecha: 'asc'
      }
    });

    // Obtener horarios para obtener las horas de las clases
    const horarios = await prisma.horario.findMany({
      where: {
        gradoId: {
          in: await prisma.gradoEstudiante.findMany({
            where: { estudianteId: user.id },
            select: { gradoId: true }
          }).then(gs => gs.map(g => g.gradoId))
        }
      },
      select: {
        materiaId: true,
        horaInicio: true,
        horaFin: true,
        dia: true
      }
    });

    // Agrupar por día
    const asistenciasPorDia: Record<string, { presente: boolean; clases: Array<{
      id: number;
      nombre: string;
      presente: boolean;
      horaInicio: string;
      horaFin: string;
    }> }> = {};
    
    asistencias.forEach((asistencia: any) => {
      const day = asistencia.fecha.getDate();
      const key = day.toString().padStart(2, '0');
      
      // Buscar el horario para esta materia
      const horario = horarios.find(h => h.materiaId === asistencia.materia.id);
      
      if (!asistenciasPorDia[key]) {
        asistenciasPorDia[key] = {
          presente: true,
          clases: []
        };
      }
      
      asistenciasPorDia[key].clases.push({
        id: asistencia.materia.id,
        nombre: asistencia.materia.nombre,
        presente: asistencia.presente,
        horaInicio: horario?.horaInicio || 'N/A',
        horaFin: horario?.horaFin || 'N/A'
      });
      
      // Marcar ausente si alguna materia está presente = false
      if (!asistencia.presente) {
        asistenciasPorDia[key].presente = false;
      }
    });

    return NextResponse.json({
      success: true,
      year,
      month,
      asistencias: asistenciasPorDia
    });
  } catch (error) {
    console.error('Error obteniendo asistencias:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
