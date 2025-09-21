import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from './firebaseAdmin';
import { PrismaClient } from '@prisma/client';

initFirebaseAdmin();
const prisma = new PrismaClient();

/**
 * Verifica el token de Firebase y que el usuario tenga rol 'admin'.
 * Si no es válido, retorna una respuesta 401/403. Si es válido, retorna el usuario.
 */
export async function requireAdmin(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
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
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'No autorizado (solo admin)' }, { status: 403 });
    }
    return user;
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
