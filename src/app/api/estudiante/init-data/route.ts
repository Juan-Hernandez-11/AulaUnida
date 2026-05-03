import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

/**
 * Endpoint para inicializar datos de prueba para un estudiante
 * Agrega el estudiante al primer grado disponible si no está matriculado
 */
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

    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'No autorizado (solo estudiante)' }, { status: 403 });
    }

    // Verificar si ya está matriculado
    const yaMatriculado = await prisma.gradoEstudiante.findFirst({
      where: { estudianteId: user.id },
    });

    if (yaMatriculado) {
      return NextResponse.json({ 
        message: 'Ya estás matriculado',
        gradoId: yaMatriculado.gradoId 
      });
    }

    // Obtener el primer grado disponible
    const primerGrado = await prisma.grado.findFirst({
      orderBy: { nombre: 'asc' }
    });

    if (!primerGrado) {
      return NextResponse.json({ 
        error: 'No hay grados disponibles en el sistema' 
      }, { status: 400 });
    }

    // Matricular al estudiante en ese grado
    await prisma.gradoEstudiante.create({
      data: {
        estudianteId: user.id,
        gradoId: primerGrado.id,
      }
    });

    return NextResponse.json({ 
      message: 'Matriculado exitosamente',
      grado: primerGrado
    });
  } catch (error) {
    console.error('Error en init-data:', error);
    return NextResponse.json({ error: 'Error al inicializar datos' }, { status: 500 });
  }
}
