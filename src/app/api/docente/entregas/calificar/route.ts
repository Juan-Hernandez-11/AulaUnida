import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

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
    const { entregaId, calificacion, retroalimentacion } = body;

    if (!entregaId || calificacion === undefined) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    // Validar calificación
    if (calificacion < 0 || calificacion > 5) {
      return NextResponse.json(
        { error: 'La calificación debe estar entre 0 y 5' },
        { status: 400 }
      );
    }

    // Obtener la entrega
    const entrega = await prisma.entrega.findUnique({
      where: { id: entregaId },
      include: {
        tarea: {
          include: {
            materia: true,
          },
        },
      },
    });

    if (!entrega) {
      return NextResponse.json({ error: 'Entrega no encontrada' }, { status: 404 });
    }

    // Verificar que el docente tiene asignada la materia
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: {
        docenteId: user.id,
        materiaGrado: {
          materiaId: entrega.tarea.materiaId,
        },
      },
    });

    if (!asignacion) {
      return NextResponse.json(
        { error: 'No autorizado para calificar esta entrega' },
        { status: 403 }
      );
    }

    // Obtener el período (tomar el primero disponible)
    const periodo = await prisma.periodo.findFirst();

    if (!periodo) {
      return NextResponse.json(
        { error: 'No hay período disponible para calificar' },
        { status: 400 }
      );
    }

    // Verificar si ya existe calificación
    const calificacionExistente = await prisma.calificacion.findUnique({
      where: { entregaId },
    });

    if (calificacionExistente) {
      // Actualizar calificación existente
      await prisma.calificacion.update({
        where: { entregaId },
        data: {
          valor: calificacion,
          retroalimentacion: retroalimentacion || null,
          calificadaAt: new Date(),
        },
      });

      // Actualizar nota detalle si existe
      const notaExistente = await prisma.notaDetalle.findFirst({
        where: {
          estudianteId: entrega.estudianteId,
          materiaId: entrega.tarea.materiaId,
          periodoId: periodo.id,
          descripcion: {
            startsWith: `Entrega: ${entrega.tarea.titulo}`,
          },
        },
      });

      if (notaExistente) {
        await prisma.notaDetalle.update({
          where: { id: notaExistente.id },
          data: {
            valor: calificacion,
          },
        });
      } else {
        // Crear nueva nota detalle si no existe
        await prisma.notaDetalle.create({
          data: {
            estudianteId: entrega.estudianteId,
            materiaId: entrega.tarea.materiaId,
            periodoId: periodo.id,
            descripcion: `Entrega: ${entrega.tarea.titulo}`,
            valor: calificacion,
            peso: 10, // Peso por defecto
          },
        });
      }
    } else {
      // Crear nueva calificación
      await prisma.calificacion.create({
        data: {
          entregaId,
          valor: calificacion,
          retroalimentacion: retroalimentacion || null,
          periodoId: periodo.id,
        },
      });

      // Crear nota detalle automáticamente
      await prisma.notaDetalle.create({
        data: {
          estudianteId: entrega.estudianteId,
          materiaId: entrega.tarea.materiaId,
          periodoId: periodo.id,
          descripcion: `Entrega: ${entrega.tarea.titulo}`,
          valor: calificacion,
          peso: 10, // Peso por defecto
        },
      });
    }

    return NextResponse.json({
      message: 'Calificación guardada correctamente y nota generada',
      calificacion: {
        valor: calificacion,
        retroalimentacion: retroalimentacion || '',
      },
    });
  } catch (error) {
    console.error('Error en POST /api/docente/entregas/calificar:', error);
    return NextResponse.json(
      { error: 'Error al guardar calificación' },
      { status: 500 }
    );
  }
}
