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
        role: true
      }
    });

    if (!docente || docente.role !== 'DOCENTE') {
      return NextResponse.json(
        { error: 'Usuario no autorizado como docente' },
        { status: 403 }
      );
    }

    // Obtener horarios del docente
    const horarios = await prisma.horario.findMany({
      where: { docenteId: docente.id },
      include: {
        materia: {
          select: {
            nombre: true
          }
        },
        grado: {
          select: {
            nombre: true,
            seccion: true
          }
        },
        aula: {
          select: {
            codigo: true,
            nombre: true
          }
        },
        ciclo: {
          select: {
            nombre: true,
            fechaInicio: true,
            fechaFin: true,
            cerrado: true
          }
        }
      },
      orderBy: [
        { dia: 'asc' },
        { horaInicio: 'asc' }
      ]
    });

    // Filtrar solo horarios de ciclos activos
    const horariosActivos = horarios.filter(h => !h.ciclo.cerrado);

    return NextResponse.json(horariosActivos);

  } catch (error) {
    console.error('Error en endpoint de horarios del docente:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}