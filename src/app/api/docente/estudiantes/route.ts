
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// GET: Devuelve los estudiantes de un grado/asignatura si el docente tiene esa asignación
export async function GET(req: NextRequest) {
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
    const { searchParams } = new URL(req.url);
    const gradoId = Number(searchParams.get('gradoId'));
    const materiaId = Number(searchParams.get('materiaId'));
    if (!gradoId || !materiaId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
    // Validar asignación usando SQL raw para compatibilidad
    try {
      const materiaGradoCheck = await prisma.$queryRaw`
        SELECT mg.id, mgd.id as asignacion_id 
        FROM "MateriaGrado" mg
        JOIN "MateriaGradoDocente" mgd ON mg.id = mgd."materiaGradoId"
        WHERE mg."gradoId" = ${gradoId} 
        AND mg."materiaId" = ${materiaId}
        AND mgd."docenteId" = ${docenteId}
        LIMIT 1
      `;
      
      if (!Array.isArray(materiaGradoCheck) || materiaGradoCheck.length === 0) {
        return NextResponse.json({ error: 'No autorizado para este grupo/materia' }, { status: 403 });
      }
    } catch (validationError) {
      console.error('Error validando asignación:', validationError);
      return NextResponse.json({ error: 'Error validando permisos' }, { status: 500 });
    }

    // Buscar estudiantes matriculados usando SQL raw
    try {
      const estudiantes = await prisma.$queryRaw`
        SELECT u.id, u.name, u.email
        FROM "User" u
        JOIN "GradoEstudiante" ge ON u.id = ge."estudianteId"
        WHERE ge."gradoId" = ${gradoId}
        AND u.role = 'STUDENT'
        ORDER BY u.name
      `;

      // Formatear respuesta simple
      const estudiantesFormateados = Array.isArray(estudiantes) ? estudiantes.map((est: any) => ({
        id: est.id,
        name: est.name || 'Sin nombre',
        email: est.email,
        promedio: 0,
        totalNotas: 0,
        periodosConNotas: 0,
        notasPorPeriodo: {}
      })) : [];

      return NextResponse.json(estudiantesFormateados);
    } catch (dbError) {
      console.error('Error obteniendo estudiantes:', dbError);
      return NextResponse.json([], { status: 200 }); // Devolver array vacío en lugar de error
    }
  } catch (error) {
    console.error('Error general en /api/docente/estudiantes:', error);
    return NextResponse.json([], { status: 200 }); // Devolver array vacío en lugar de error
  }
}
