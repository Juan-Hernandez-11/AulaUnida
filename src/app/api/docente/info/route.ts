import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);

    // Buscar el usuario docente
    const docente = await prisma.user.findUnique({
      where: { firebaseUid: decodedToken.uid },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        sedeId: true,
        sede: {
          select: {
            nombre: true
          }
        }
      }
    });

    if (!docente || docente.role !== 'DOCENTE') {
      return NextResponse.json(
        { error: 'Usuario no autorizado como docente' },
        { status: 403 }
      );
    }

    // Obtener asignaciones del docente
    const materiaGradoDocentes = await prisma.materiaGradoDocente.findMany({
      where: { docenteId: docente.id },
      include: {
        materiaGrado: {
          include: {
            materia: true,
            grado: true
          }
        }
      }
    });

    const gradosUnicos = new Set(materiaGradoDocentes.map(mgd => mgd.materiaGrado.gradoId));
    const materiasUnicas = new Set(materiaGradoDocentes.map(mgd => mgd.materiaGrado.materiaId));

    const resumen = {
      totalAsignaciones: materiaGradoDocentes.length,
      gradosActivos: gradosUnicos.size,
      materiasAsignadas: materiasUnicas.size
    };

    return NextResponse.json({
      docente,
      resumen
    });

  } catch (error) {
    console.error('Error en endpoint de información del docente:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}