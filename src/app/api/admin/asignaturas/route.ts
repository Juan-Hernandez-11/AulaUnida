import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todas las asignaturas (id, nombre, gradoId)
export async function GET() {
  try {
    const materias = await prisma.materia.findMany({
      select: {
        id: true,
        nombre: true,
        area: true,
        codigo: true,
        materiaGrados: {
          select: {
            id: true,
            grado: { select: { id: true, nombre: true, seccion: true } },
            materiaGradoDocentes: {
              select: {
                id: true,
                docente: { select: { id: true, name: true } },
                periodo: { select: { id: true, nombre: true } }
              }
            }
          }
        }
      },
      orderBy: { nombre: 'asc' },
    });
    // Formatear para frontend: grados y docentes por grado
    const result = materias.map((m: any) => ({
      id: m.id,
      nombre: m.nombre,
      area: m.area,
      codigo: m.codigo,
      grados: m.materiaGrados.map((mg: any) => ({
        id: mg.grado.id,
        nombre: mg.grado.nombre,
        seccion: mg.grado.seccion,
        docentes: mg.materiaGradoDocentes.map((mgd: any) => ({
          id: mgd.docente.id,
          name: mgd.docente.name,
          periodo: mgd.periodo ? { id: mgd.periodo.id, nombre: mgd.periodo.nombre } : null
        }))
      }))
    }));
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener asignaturas' }, { status: 500 });
  }
}

// POST: Crea una asignatura. Body: { nombre, gradoId }
export async function POST(request: Request) {
  try {
    const { nombre, area, codigo, gradoIds, asignaciones } = await request.json();
    if (!nombre || !area || !codigo || !Array.isArray(gradoIds) || gradoIds.length === 0) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    // Crear materia y grados
    const materia = await prisma.materia.create({
      data: {
        nombre,
        area,
        codigo,
        materiaGrados: {
          create: gradoIds.map((gradoId: number) => ({ grado: { connect: { id: gradoId } } }))
        }
      },
      include: {
        materiaGrados: { select: { id: true, grado: { select: { id: true, nombre: true, seccion: true } }, materiaGradoDocentes: true } }
      }
    });
    // Asignar docentes por grado y periodo
    if (Array.isArray(asignaciones)) {
      for (const asig of asignaciones) {
        // Buscar el id de MateriaGrado para el grado
        const mg = materia.materiaGrados.find(mg => mg.grado.id === asig.gradoId);
        if (mg) {
          await prisma.materiaGradoDocente.create({
            data: {
              materiaGradoId: mg.id,
              docenteId: asig.docenteId,
              periodoId: asig.periodoId || null
            }
          });
        }
      }
    }
    // Obtener materia con grados y docentes
    const materiaFull = await prisma.materia.findUnique({
      where: { id: materia.id },
      select: {
        id: true,
        nombre: true,
        area: true,
        codigo: true,
        materiaGrados: {
          select: {
            id: true,
            grado: { select: { id: true, nombre: true, seccion: true } },
            materiaGradoDocentes: {
              select: {
                docente: { select: { id: true, name: true } },
                periodo: { select: { id: true, nombre: true } }
              }
            }
          }
        }
      }
    });
    return NextResponse.json(materiaFull);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear asignatura' }, { status: 500 });
  }
}

// PUT: Edita una asignatura. Body: { id, nombre, gradoId }
export async function PUT(request: Request) {
  try {
    const { id, nombre, area, codigo, gradoIds, asignaciones } = await request.json();
    if (!id || !nombre || !area || !codigo || !Array.isArray(gradoIds) || gradoIds.length === 0) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    // Actualizar materia
    const materia = await prisma.materia.update({
      where: { id: Number(id) },
      data: { nombre, area, codigo },
    });
    // Actualizar grados asociados (MateriaGrado)
    await prisma.materiaGrado.deleteMany({ where: { materiaId: materia.id } });
    const nuevosMG = await Promise.all(gradoIds.map(async (gradoId: number) => {
      return await prisma.materiaGrado.create({ data: { materiaId: materia.id, gradoId } });
    }));
    // Limpiar asignaciones previas de docentes
    for (const mg of nuevosMG) {
  await prisma.materiaGradoDocente.deleteMany({ where: { materiaGradoId: mg.id } });
    }
    // Asignar docentes por grado y periodo
    if (Array.isArray(asignaciones)) {
      for (const asig of asignaciones) {
        const mg = nuevosMG.find(mg => mg.gradoId === asig.gradoId);
        if (mg) {
          await prisma.materiaGradoDocente.create({
            data: {
              materiaGradoId: mg.id,
              docenteId: asig.docenteId,
              periodoId: asig.periodoId || null
            }
          });
        }
      }
    }
    // Obtener materia actualizada con grados y docentes
    const materiaFull = await prisma.materia.findUnique({
      where: { id: materia.id },
      select: {
        id: true,
        nombre: true,
        area: true,
        codigo: true,
        materiaGrados: {
          select: {
            id: true,
            grado: { select: { id: true, nombre: true, seccion: true } },
            materiaGradoDocentes: {
              select: {
                docente: { select: { id: true, name: true } },
                periodo: { select: { id: true, nombre: true } }
              }
            }
          }
        }
      }
    });
    return NextResponse.json(materiaFull);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar asignatura' }, { status: 500 });
  }
}

// DELETE: Elimina una asignatura. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.materiaGrado.deleteMany({ where: { materiaId: Number(id) } });
    await prisma.materiaDocente.deleteMany({ where: { materiaId: Number(id) } });
    await prisma.materia.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar asignatura' }, { status: 500 });
  }
}
