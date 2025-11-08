
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// GET: Obtener notas existentes para un grado/materia/periodo
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
      select: { id: true, email: true, role: true },
    });
    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }
    
    const docenteId = user.id;
    const { searchParams } = new URL(req.url);
    const gradoId = Number(searchParams.get('gradoId'));
    const materiaId = Number(searchParams.get('materiaId'));
    const periodoId = Number(searchParams.get('periodoId'));
    
    if (!gradoId || !materiaId || !periodoId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
    
    // Validar asignación
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
    
    // Obtener notas existentes
    const notas = await prisma.notaMateriaPeriodo.findMany({
      where: {
        materiaId,
        periodoId,
        estudiante: {
          estudianteGrados: {
            some: { gradoId }
          }
        }
      },
      include: {
        estudiante: true,
        periodo: true
      },
      orderBy: [
        { estudianteId: 'asc' },
        { numeroNota: 'asc' }
      ]
    });
    
    return NextResponse.json(notas);
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}

// POST: Guardar o actualizar notas de estudiantes para una materia/grado/periodo
export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { gradoId, materiaId, periodoId, notas } = body;
    if (!gradoId || !materiaId || !periodoId || !Array.isArray(notas)) {
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
    // Guardar o actualizar notas
    for (const nota of notas) {
      const { estudianteId, numeroNota, valor, descripcion } = nota;
      if (!estudianteId || typeof valor !== 'number' || !numeroNota) continue;
      
      await prisma.notaMateriaPeriodo.upsert({
        where: {
          estudianteId_materiaId_periodoId_numeroNota: {
            estudianteId,
            materiaId,
            periodoId,
            numeroNota
          },
        },
        update: { 
          valor,
          descripcion: descripcion || null
        },
        create: {
          estudianteId,
          materiaId,
          periodoId,
          numeroNota,
          valor,
          descripcion: descripcion || null
        },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
