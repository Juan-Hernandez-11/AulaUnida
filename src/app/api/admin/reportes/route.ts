import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Generar reportes
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
    const tipo = url.searchParams.get('tipo') || 'resumen'; // resumen, estudiantes-grado, notas-materia, asistencia, docentes

    let reporte: any = {};

    switch (tipo) {
      case 'resumen':
        reporte = await generarReporteResumen();
        break;
      case 'estudiantes-grado':
        const gradoId = url.searchParams.get('gradoId') ? parseInt(url.searchParams.get('gradoId')!) : null;
        if (!gradoId) {
          return NextResponse.json({ error: 'Falta parámetro: gradoId' }, { status: 400 });
        }
        reporte = await generarReporteEstudiantesGrado(gradoId);
        break;
      case 'notas-materia':
        const materiaId = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;
        const periodoId = url.searchParams.get('periodoId') ? parseInt(url.searchParams.get('periodoId')!) : null;
        if (!materiaId || !periodoId) {
          return NextResponse.json({ error: 'Faltan parámetros: materiaId, periodoId' }, { status: 400 });
        }
        reporte = await generarReporteNotasMateria(materiaId, periodoId);
        break;
      case 'asistencia':
        const materiaIdA = url.searchParams.get('materiaId') ? parseInt(url.searchParams.get('materiaId')!) : null;
        if (!materiaIdA) {
          return NextResponse.json({ error: 'Falta parámetro: materiaId' }, { status: 400 });
        }
        reporte = await generarReporteAsistencia(materiaIdA);
        break;
      case 'docentes':
        reporte = await generarReporteDocentes();
        break;
      default:
        return NextResponse.json({ error: 'Tipo de reporte no válido' }, { status: 400 });
    }

    return NextResponse.json({ 
      reporte,
      tipo,
      generadoEn: new Date(),
    });
  } catch (error) {
    console.error('Error en GET /api/admin/reportes:', error);
    return NextResponse.json({ error: 'Error al generar reporte' }, { status: 500 });
  }
}

// Funciones auxiliares para generar reportes

async function generarReporteResumen() {
  const totalUsuarios = await prisma.user.count();
  const totalEstudiantes = await prisma.user.count({ where: { role: 'STUDENT' } });
  const totalDocentes = await prisma.user.count({ where: { role: 'DOCENTE' } });
  const totalAdmins = await prisma.user.count({ where: { role: 'ADMIN' } });
  const totalGrados = await prisma.grado.count();
  const totalMaterias = await prisma.materia.count();
  const totalSedes = await prisma.sede.count();

  return {
    resumen: {
      totalUsuarios,
      totalEstudiantes,
      totalDocentes,
      totalAdmins,
      totalGrados,
      totalMaterias,
      totalSedes,
    },
  };
}

async function generarReporteEstudiantesGrado(gradoId: number) {
  const grado = await prisma.grado.findUnique({
    where: { id: gradoId },
  });

  if (!grado) {
    throw new Error('Grado no encontrado');
  }

  const estudiantesGrado = await prisma.gradoEstudiante.findMany({
    where: { gradoId },
    include: {
      estudiante: {
        select: {
          id: true,
          name: true,
          email: true,
          documentNumber: true,
        },
      },
    },
  });

  return {
    grado: {
      nombre: grado.nombre,
      seccion: grado.seccion,
    },
    estudiantes: estudiantesGrado,
    totalEstudiantes: estudiantesGrado.length,
  };
}

async function generarReporteNotasMateria(materiaId: number, periodoId: number) {
  const materia = await prisma.materia.findUnique({
    where: { id: materiaId },
  });

  const periodo = await prisma.periodo.findUnique({
    where: { id: periodoId },
  });

  if (!materia || !periodo) {
    throw new Error('Materia o período no encontrado');
  }

  const notas = await prisma.notaMateriaPeriodo.findMany({
    where: {
      materiaId,
      periodoId,
    },
    include: {
      estudiante: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // Calcular estadísticas
  const valores = notas.map(n => n.valor);
  const promedio = valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  const maxima = valores.length > 0 ? Math.max(...valores) : 0;
  const minima = valores.length > 0 ? Math.min(...valores) : 0;

  return {
    materia: {
      nombre: materia.nombre,
      codigo: materia.codigo,
    },
    periodo: {
      nombre: periodo.nombre,
    },
    notas,
    estadisticas: {
      promedio: Math.round(promedio * 100) / 100,
      notaMaxima: maxima,
      notaMinima: minima,
      totalEstudiantes: notas.length,
    },
  };
}

async function generarReporteAsistencia(materiaId: number) {
  const materia = await prisma.materia.findUnique({
    where: { id: materiaId },
  });

  if (!materia) {
    throw new Error('Materia no encontrada');
  }

  const asistencias = await prisma.asistencia.findMany({
    where: { materiaId },
    include: {
      estudiante: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { fecha: 'desc' },
  });

  // Agrupar por estudiante
  const porEstudiante: any = {};
  for (const a of asistencias) {
    if (!porEstudiante[a.estudianteId]) {
      porEstudiante[a.estudianteId] = {
        estudiante: a.estudiante,
        presente: 0,
        ausente: 0,
        total: 0,
      };
    }
    porEstudiante[a.estudianteId].total++;
    if (a.presente) {
      porEstudiante[a.estudianteId].presente++;
    } else {
      porEstudiante[a.estudianteId].ausente++;
    }
  }

  return {
    materia: {
      nombre: materia.nombre,
      codigo: materia.codigo,
    },
    asistenciaPorEstudiante: Object.values(porEstudiante),
    totalRegistros: asistencias.length,
  };
}

async function generarReporteDocentes() {
  const docentes = await prisma.user.findMany({
    where: { role: 'DOCENTE' },
    include: {
      docenteMaterias: {
        include: {
          materia: true,
        },
      },
      materiaGradoDocentes: true,
    },
  });

  return {
    docentes: docentes.map(d => ({
      id: d.id,
      name: d.name,
      email: d.email,
      materias: d.docenteMaterias.map(dm => ({
        id: dm.materia.id,
        nombre: dm.materia.nombre,
        codigo: dm.materia.codigo,
      })),
      totalMaterias: d.docenteMaterias.length,
      asignacionesGradoMateria: d.materiaGradoDocentes.length,
    })),
    totalDocentes: docentes.length,
  };
}
