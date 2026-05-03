import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await req.json();
    const { estudianteId, materiaId, periodoId, descripcion, valor, peso } = body;

    // Validar datos
    if (!estudianteId || !materiaId || !periodoId || !descripcion || valor === undefined || peso === undefined) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    if (valor < 0 || valor > 5) {
      return NextResponse.json({ error: 'Valor debe estar entre 0 y 5' }, { status: 400 });
    }

    if (peso < 0 || peso > 100) {
      return NextResponse.json({ error: 'Peso debe estar entre 0 y 100' }, { status: 400 });
    }

    // Crear nota detalle
    const notaDetalle = await prisma.notaDetalle.create({
      data: {
        estudianteId: parseInt(String(estudianteId)),
        materiaId: parseInt(String(materiaId)),
        periodoId: parseInt(String(periodoId)),
        descripcion,
        valor: parseFloat(String(valor)),
        peso: parseFloat(String(peso)),
      },
    });

    return NextResponse.json({
      mensaje: 'Nota creada exitosamente',
      notaDetalle,
    });
  } catch (error) {
    console.error('Error creando nota:', error);
    return NextResponse.json({ error: 'Error al crear nota' }, { status: 500 });
  }
}

// GET: Obtener todas las notas detalladas de un estudiante en una materia y período
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const url = new URL(req.url);
    const estudianteId = url.searchParams.get('estudianteId') ? parseInt(url.searchParams.get('estudianteId')!) : null;
    const materiaId = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;
    const periodoId = url.searchParams.get('periodoId') ? parseInt(url.searchParams.get('periodoId')!) : null;

    if (!estudianteId || !materiaId || !periodoId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const notasDetalles = await prisma.notaDetalle.findMany({
      where: {
        estudianteId,
        materiaId,
        periodoId,
      },
      orderBy: {
        fecha: 'desc',
      },
    });

    // Calcular promedio ponderado
    const totalPeso = notasDetalles.reduce((sum: number, n: any) => sum + n.peso, 0);
    const promedioPonderado =
      totalPeso > 0
        ? notasDetalles.reduce((sum: number, n: any) => sum + (n.valor * n.peso) / 100, 0)
        : 0;

    return NextResponse.json({
      notas: notasDetalles,
      promedioPonderado: parseFloat(promedioPonderado.toFixed(2)),
      totalPeso,
    });
  } catch (error) {
    console.error('Error obteniendo notas:', error);
    return NextResponse.json({ error: 'Error al obtener notas' }, { status: 500 });
  }
}

// DELETE: Eliminar una nota detalle
export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await req.json();
    const { notaId } = body;

    if (!notaId) {
      return NextResponse.json({ error: 'ID de nota requerido' }, { status: 400 });
    }

    const notaEliminada = await prisma.notaDetalle.delete({
      where: { id: notaId },
    });

    return NextResponse.json({
      mensaje: 'Nota eliminada exitosamente',
      notaEliminada,
    });
  } catch (error) {
    console.error('Error eliminando nota:', error);
    return NextResponse.json({ error: 'Error al eliminar nota' }, { status: 500 });
  }
}
