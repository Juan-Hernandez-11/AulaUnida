import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todos los estudiantes (usuarios con rol 'STUDENT')
export async function GET() {
  try {
    const estudiantes = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(estudiantes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener estudiantes' }, { status: 500 });
  }
}
