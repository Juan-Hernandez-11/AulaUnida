import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/admin/asignaturas
 * Obtiene todas las asignaturas con sus materias asociadas
 * Responde: [{ id, nombre, codigo, descripcion, materias: [{ id, nombre, codigo }] }]
 */
export async function GET(req: NextRequest) {
  try {
    const asignaturas = await prisma.asignatura.findMany({
      include: {
        materias: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
            area: true
          }
        }
      },
      orderBy: { nombre: 'asc' }
    });

    return NextResponse.json(asignaturas);
  } catch (error) {
    console.error('Error en GET /api/admin/asignaturas:', error);
    return NextResponse.json({ error: 'Error al obtener asignaturas' }, { status: 500 });
  }
}

/**
 * POST /api/admin/asignaturas
 * Crea una nueva asignatura
 * Body: { nombre: string, codigo?: string, descripcion?: string }
 * Responde: { id, nombre, codigo, descripcion }
 */
export async function POST(req: NextRequest) {
  try {
    const { nombre, codigo, descripcion } = await req.json();

    if (!nombre) {
      return NextResponse.json({ error: 'nombre es requerido' }, { status: 400 });
    }

    const asignatura = await prisma.asignatura.create({
      data: {
        nombre,
        codigo: codigo || null,
        descripcion: descripcion || null
      }
    });

    return NextResponse.json(asignatura, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/admin/asignaturas:', error);
    return NextResponse.json({ error: 'Error al crear asignatura' }, { status: 500 });
  }
}
