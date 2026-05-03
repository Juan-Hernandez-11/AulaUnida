import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Obtener tareas del docente
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

    const docenteId = user.id;
    const url = new URL(req.url);
    const gradoId = url.searchParams.get('gradoId') ? parseInt(url.searchParams.get('gradoId')!) : null;
    const materiaId = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;

    // Obtener todas las asignaciones de materias del docente a través de MateriaGradoDocente
    const asignaciones = await prisma.materiaGradoDocente.findMany({
      where: {
        docenteId: docenteId,
      },
      select: {
        materiaGrado: {
          select: {
            materiaId: true,
          },
        },
      },
    });

    const materiaIds = asignaciones.map(a => a.materiaGrado.materiaId);

    if (materiaIds.length === 0) {
      return NextResponse.json({ tareas: [] });
    }

    // Construir filtro base: tareas de materias asignadas al docente
    let where: any = {
      materiaId: {
        in: materiaIds,
      },
    };

    // Si especifica materiaId, asegurar que esté en las asignadas
    if (materiaId) {
      if (!materiaIds.includes(materiaId)) {
        return NextResponse.json({ error: 'No autorizado para acceder a esa materia' }, { status: 403 });
      }
      where.materiaId = materiaId;
    }

    const tareas = await prisma.tarea.findMany({
      where,
      include: {
        materia: true,
        entregas: {
          include: {
            estudiante: true,
            calificacion: true,
          },
        },
      },
    });

    return NextResponse.json({ tareas });
  } catch (error) {
    console.error('Error en GET /api/docente/tareas:', error);
    return NextResponse.json({ error: 'Error al obtener tareas' }, { status: 500 });
  }
}

// POST: Crear nueva tarea
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
    const { materiaId, titulo, descripcion, fechaEntrega, horaEntrega } = body;

    if (!materiaId || !titulo) {
      return NextResponse.json({ error: 'Faltan parámetros: materiaId, titulo' }, { status: 400 });
    }

    // Verificar que el docente tiene asignada la materia a través de MateriaGradoDocente
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: {
        docenteId: user.id,
        materiaGrado: {
          materiaId: materiaId
        }
      }
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado: no tienes asignada esta materia' }, { status: 403 });
    }

    // Construir la fecha y hora de entrega
    let fechaEntregaCompleta = null;
    if (fechaEntrega) {
      fechaEntregaCompleta = new Date(fechaEntrega);
      // Si hay hora de entrega, sumarla a la fecha
      if (horaEntrega) {
        const [horas, minutos] = horaEntrega.split(':').map(Number);
        fechaEntregaCompleta.setHours(horas, minutos, 0, 0);
      }
    }

    // Crear tarea
    const tarea = await prisma.tarea.create({
      data: {
        materiaId,
        titulo,
        descripcion: descripcion || '',
        fechaEntrega: fechaEntregaCompleta,
      },
      include: {
        materia: true,
      },
    });

    return NextResponse.json({ tarea }, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/docente/tareas:', error);
    return NextResponse.json({ error: 'Error al crear tarea' }, { status: 500 });
  }
}

// PUT: Actualizar tarea
export async function PUT(req: NextRequest) {
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
    const { tareaId, titulo, descripcion, fechaEntrega, horaEntrega } = body;

    if (!tareaId) {
      return NextResponse.json({ error: 'Falta parámetro: tareaId' }, { status: 400 });
    }

    // Verificar permisos: que el docente tenga asignada la materia de esta tarea
    const tarea = await prisma.tarea.findUnique({
      where: { id: tareaId },
      include: { materia: true },
    });

    if (!tarea) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    // Verificar que el docente tiene asignada la materia
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: {
        docenteId: user.id,
        materiaGrado: {
          materiaId: tarea.materiaId
        }
      }
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para actualizar esta tarea' }, { status: 403 });
    }

    // Construir la fecha y hora de entrega
    let fechaEntregaCompleta = tarea.fechaEntrega;
    if (fechaEntrega) {
      fechaEntregaCompleta = new Date(fechaEntrega);
      // Si hay hora de entrega, sumarla a la fecha
      if (horaEntrega) {
        const [horas, minutos] = horaEntrega.split(':').map(Number);
        fechaEntregaCompleta.setHours(horas, minutos, 0, 0);
      }
    }

    // Actualizar
    const tareaActual = await prisma.tarea.update({
      where: { id: tareaId },
      data: {
        titulo: titulo || tarea.titulo,
        descripcion: descripcion !== undefined ? descripcion : tarea.descripcion,
        fechaEntrega: fechaEntregaCompleta,
      },
      include: {
        materia: true,
      },
    });

    return NextResponse.json({ tarea: tareaActual });
  } catch (error) {
    console.error('Error en PUT /api/docente/tareas:', error);
    return NextResponse.json({ error: 'Error al actualizar tarea' }, { status: 500 });
  }
}

// DELETE: Eliminar tarea
export async function DELETE(req: NextRequest) {
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
    const tareaId = url.searchParams.get('tareaId') ? parseInt(url.searchParams.get('tareaId')!) : null;

    if (!tareaId) {
      return NextResponse.json({ error: 'Falta parámetro: tareaId' }, { status: 400 });
    }

    const tarea = await prisma.tarea.findUnique({
      where: { id: tareaId },
      include: { materia: true },
    });

    if (!tarea) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    // Verificar que el docente tiene asignada la materia
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: {
        docenteId: user.id,
        materiaGrado: {
          materiaId: tarea.materiaId
        }
      }
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para eliminar esta tarea' }, { status: 403 });
    }

    // Eliminar entregas asociadas primero
    await prisma.entrega.deleteMany({
      where: { tareaId },
    });

    // Eliminar tarea
    await prisma.tarea.delete({
      where: { id: tareaId },
    });

    return NextResponse.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error en DELETE /api/docente/tareas:', error);
    return NextResponse.json({ error: 'Error al eliminar tarea' }, { status: 500 });
  }
}
