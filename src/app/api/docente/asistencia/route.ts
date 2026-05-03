import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Obtener registro de asistencia de una clase
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }

    const url = new URL(req.url);
    const materiaId = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;
    const gradoId = url.searchParams.get('gradoId') ? parseInt(url.searchParams.get('gradoId')!) : null;
    const fecha = url.searchParams.get('fecha');

    if (!materiaId || !gradoId || !fecha) {
      return NextResponse.json({ error: 'Faltan parámetros: materiaId, gradoId, fecha' }, { status: 400 });
    }

    // Verificar que el docente tiene asignada esta materia en este grado
    const materiaGrado = await prisma.materiaGrado.findFirst({
      where: { materiaId, gradoId },
    });

    if (!materiaGrado) {
      return NextResponse.json({ error: 'No existe esa asignación materia/grado' }, { status: 404 });
    }

    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: { materiaGradoId: materiaGrado.id, docenteId: user.id },
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para registrar asistencia en esta clase' }, { status: 403 });
    }

    // Obtener asistencias del día
    const inicio = new Date(fecha);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fecha);
    fin.setHours(23, 59, 59, 999);

    const asistencias = await prisma.asistencia.findMany({
      where: {
        materiaId,
        fecha: {
          gte: inicio,
          lte: fin,
        },
        estudiante: {
          estudianteGrados: {
            some: {
              gradoId,
            },
          },
        },
      },
      include: {
        estudiante: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Obtener todos los estudiantes del grado para comparar
    const estudiantesGrado = await prisma.gradoEstudiante.findMany({
      where: { gradoId },
      include: { estudiante: true },
    });

    return NextResponse.json({ 
      asistencias,
      estudiantes: estudiantesGrado.map(ge => ge.estudiante),
      registroDelDia: asistencias.length > 0,
    });
  } catch (error) {
    console.error('Error en GET /api/docente/asistencia:', error);
    return NextResponse.json({ error: 'Error al obtener asistencia' }, { status: 500 });
  }
}

// POST: Registrar asistencia de estudiantes
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }

    const body = await req.json();
    const { materiaId, gradoId, fecha, registros } = body;

    if (!materiaId || !gradoId || !fecha || !Array.isArray(registros)) {
      return NextResponse.json({ 
        error: 'Faltan parámetros: materiaId, gradoId, fecha, registros (array)'
      }, { status: 400 });
    }

    // Verificar permisos
    const materiaGrado = await prisma.materiaGrado.findFirst({
      where: { materiaId, gradoId },
    });

    if (!materiaGrado) {
      return NextResponse.json({ error: 'No existe esa asignación materia/grado' }, { status: 404 });
    }

    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: { materiaGradoId: materiaGrado.id, docenteId: user.id },
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para registrar asistencia' }, { status: 403 });
    }

    // Parsear fecha
    const fechaDate = new Date(fecha);
    fechaDate.setHours(0, 0, 0, 0);

    // Procesar registros de asistencia
    const asistenciasCreadas = [];
    
    for (const registro of registros) {
      const { estudianteId, presente } = registro;

      if (typeof estudianteId !== 'number' || typeof presente !== 'boolean') {
        continue;
      }

      // Verificar que el estudiante existe y está en el grado
      const estudianteEnGrado = await prisma.gradoEstudiante.findFirst({
        where: { estudianteId, gradoId },
      });

      if (!estudianteEnGrado) {
        continue; // Este estudiante no está en el grado
      }

      // Verificar si ya existe registro para esta fecha
      const existente = await prisma.asistencia.findFirst({
        where: {
          estudianteId,
          materiaId,
          fecha: {
            gte: new Date(fechaDate),
            lt: new Date(fechaDate.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      });

      let asistencia;
      if (existente) {
        // Actualizar
        asistencia = await prisma.asistencia.update({
          where: { id: existente.id },
          data: { presente },
        });
      } else {
        // Crear nuevo
        asistencia = await prisma.asistencia.create({
          data: {
            estudianteId,
            materiaId,
            fecha: fechaDate,
            presente,
          },
        });
      }

      asistenciasCreadas.push(asistencia);
    }

    return NextResponse.json({ 
      message: 'Asistencia registrada correctamente',
      asistenciasRegistradas: asistenciasCreadas.length,
    });
  } catch (error) {
    console.error('Error en POST /api/docente/asistencia:', error);
    return NextResponse.json({ error: 'Error al registrar asistencia' }, { status: 500 });
  }
}
