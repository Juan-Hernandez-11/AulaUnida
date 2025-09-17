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
      select: { role: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.error('Error en /api/user-role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
