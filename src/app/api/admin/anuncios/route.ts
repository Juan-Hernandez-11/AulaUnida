import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Listar anuncios
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

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado (solo admin)' }, { status: 403 });
    }

    const url = new URL(req.url);
    const tipo = url.searchParams.get('tipo'); // "global", "materia", etc.
    const materiaId = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;

    let whereClause: any = {};
    if (tipo === 'global') {
      whereClause.materiaId = null;
    } else if (tipo === 'materia' && materiaId) {
      whereClause.materiaId = materiaId;
    }

    const anuncios = await prisma.anuncio.findMany({
      where: whereClause,
      include: {
        autor: {
          select: { id: true, name: true, email: true },
        },
        materia: true,
      },
      orderBy: { fecha: 'desc' },
      take: 50,
    });

    return NextResponse.json({ anuncios });
  } catch (error) {
    console.error('Error en GET /api/admin/anuncios:', error);
    return NextResponse.json({ error: 'Error al obtener anuncios' }, { status: 500 });
  }
}

// POST: Crear anuncio
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

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado (solo admin)' }, { status: 403 });
    }

    const body = await req.json();
    const { mensaje, tipo, materiaId } = body;

    if (!mensaje || !tipo) {
      return NextResponse.json({ error: 'Faltan parámetros: mensaje, tipo' }, { status: 400 });
    }

    // Validar que tipo es válido
    const tiposValidos = ['global', 'materia', 'grado', 'importante'];
    if (!tiposValidos.includes(tipo)) {
      return NextResponse.json({ error: `Tipo debe ser uno de: ${tiposValidos.join(', ')}` }, { status: 400 });
    }

    // Si es de materia, verificar que existe
    if (tipo === 'materia' && materiaId) {
      const materia = await prisma.materia.findUnique({
        where: { id: materiaId },
      });
      if (!materia) {
        return NextResponse.json({ error: 'Materia no encontrada' }, { status: 404 });
      }
    }

    const anuncio = await prisma.anuncio.create({
      data: {
        mensaje,
        tipo,
        materiaId: materiaId || null,
        autorId: user.id,
      },
      include: {
        autor: {
          select: { id: true, name: true, email: true },
        },
        materia: true,
      },
    });

    return NextResponse.json({ anuncio }, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/admin/anuncios:', error);
    return NextResponse.json({ error: 'Error al crear anuncio' }, { status: 500 });
  }
}

// PUT: Actualizar anuncio
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

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado (solo admin)' }, { status: 403 });
    }

    const body = await req.json();
    const { anuncioId, mensaje, tipo } = body;

    if (!anuncioId) {
      return NextResponse.json({ error: 'Falta parámetro: anuncioId' }, { status: 400 });
    }

    const anuncio = await prisma.anuncio.findUnique({
      where: { id: anuncioId },
    });

    if (!anuncio) {
      return NextResponse.json({ error: 'Anuncio no encontrado' }, { status: 404 });
    }

    const anuncioActualizado = await prisma.anuncio.update({
      where: { id: anuncioId },
      data: {
        mensaje: mensaje || anuncio.mensaje,
        tipo: tipo || anuncio.tipo,
      },
      include: {
        autor: {
          select: { id: true, name: true, email: true },
        },
        materia: true,
      },
    });

    return NextResponse.json({ anuncio: anuncioActualizado });
  } catch (error) {
    console.error('Error en PUT /api/admin/anuncios:', error);
    return NextResponse.json({ error: 'Error al actualizar anuncio' }, { status: 500 });
  }
}

// DELETE: Eliminar anuncio
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

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado (solo admin)' }, { status: 403 });
    }

    const url = new URL(req.url);
    const anuncioId = url.searchParams.get('anuncioId') ? parseInt(url.searchParams.get('anuncioId')!) : null;

    if (!anuncioId) {
      return NextResponse.json({ error: 'Falta parámetro: anuncioId' }, { status: 400 });
    }

    const anuncio = await prisma.anuncio.findUnique({
      where: { id: anuncioId },
    });

    if (!anuncio) {
      return NextResponse.json({ error: 'Anuncio no encontrado' }, { status: 404 });
    }

    await prisma.anuncio.delete({
      where: { id: anuncioId },
    });

    return NextResponse.json({ message: 'Anuncio eliminado correctamente' });
  } catch (error) {
    console.error('Error en DELETE /api/admin/anuncios:', error);
    return NextResponse.json({ error: 'Error al eliminar anuncio' }, { status: 500 });
  }
}
