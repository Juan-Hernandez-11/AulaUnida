import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/user-role?uid=FIREBASE_UID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firebaseUid = searchParams.get('uid');

  if (!firebaseUid) {
    return NextResponse.json({ error: 'Missing uid parameter' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
      select: { role: true, id: true, email: true, name: true },
    });
    
    if (!user) {
      // Retornar 200 con role: null en lugar de 404
      return NextResponse.json({ role: null, found: false });
    }
    
    return NextResponse.json({ role: user.role, found: true, userId: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error('Error en /api/user-role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
