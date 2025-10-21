import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from './firebaseAdmin';
import { prisma } from './prisma';

initFirebaseAdmin();

export async function requireAuth(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 }) };
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);
    const user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid }, select: { id: true, role: true, active: true } });
    if (!user) return { error: NextResponse.json({ error: 'No autorizado (usuario no encontrado)' }, { status: 401 }) };
    if (!user.active) return { error: NextResponse.json({ error: 'Usuario inactivo' }, { status: 403 }) };
    return { user };
  } catch (error) {
    return { error: NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 }) };
  }
}

export async function requireRole(request: Request, roles: Array<'ADMIN'|'DOCENTE'|'STUDENT'>) {
  const res = await requireAuth(request);
  if ('error' in res) return res.error;
  const { user } = res as any;
  if (!roles.includes(user.role)) return NextResponse.json({ error: 'No autorizado (rol insuficiente)' }, { status: 403 });
  return user;
}
