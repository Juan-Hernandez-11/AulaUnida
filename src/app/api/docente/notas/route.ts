
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// GET: Obtener notas de un periodo específico
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

    const url = new URL(req.url);
    const gradoId = parseInt(url.searchParams.get('gradoId') || '0');
    const materiaId = parseInt(url.searchParams.get('materiaId') || '0');
    const periodoId = parseInt(url.searchParams.get('periodoId') || '0');

    if (!gradoId || !materiaId || !periodoId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    // Obtener notas usando SQL raw
    const notas = await prisma.$queryRaw`
      SELECT * FROM "NotaMateriaPeriodo" 
      WHERE "materiaId" = ${materiaId} 
      AND "periodoId" = ${periodoId}
    `;

    return NextResponse.json(notas || []);
  } catch (error) {
    console.error('Error en GET /api/docente/notas:', error);
    return NextResponse.json([], { status: 200 }); // Devolver array vacío en lugar de error
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
    // Guardar o actualizar notas usando SQL raw para compatibilidad
    for (const nota of notas) {
      const { estudianteId, valor } = nota;
      if (!estudianteId || typeof valor !== 'number') continue;
      
      try {
        // Verificar si existe la nota
        const existeNota = await prisma.$queryRaw`
          SELECT id FROM "NotaMateriaPeriodo" 
          WHERE "estudianteId" = ${estudianteId} 
          AND "materiaId" = ${materiaId} 
          AND "periodoId" = ${periodoId}
          LIMIT 1
        `;
        
        if (Array.isArray(existeNota) && existeNota.length > 0) {
          // Actualizar nota existente
          await prisma.$executeRaw`
            UPDATE "NotaMateriaPeriodo" 
            SET valor = ${valor}
            WHERE "estudianteId" = ${estudianteId} 
            AND "materiaId" = ${materiaId} 
            AND "periodoId" = ${periodoId}
          `;
        } else {
          // Crear nueva nota
          await prisma.$executeRaw`
            INSERT INTO "NotaMateriaPeriodo" ("estudianteId", "materiaId", "periodoId", "valor")
            VALUES (${estudianteId}, ${materiaId}, ${periodoId}, ${valor})
          `;
        }
      } catch (notaError) {
        console.error(`Error al procesar nota para estudiante ${estudianteId}:`, notaError);
        continue; // Continúa con la siguiente nota
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error en POST /api/docente/notas:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
