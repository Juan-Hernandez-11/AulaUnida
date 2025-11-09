import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '@/lib/requireAdmin';

const prisma = new PrismaClient();

// PUT: Edita un usuario existente. Body: { id, name, email, role, documentType, documentNumber, birthDate, phone, address, gender, photoUrl }
export async function PUT(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return NextResponse.json(admin, { status: 403 });
  try {
    const body = await request.json();
    const {
      id, name, email, role, documentType, documentNumber, birthDate, phone, address, gender, photoUrl
    } = body || {};
    if (!id) {
      return NextResponse.json({ error: 'El id es obligatorio.', field: 'id' }, { status: 400 });
    }
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'El nombre es obligatorio.', field: 'name' }, { status: 400 });
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'El correo es obligatorio.', field: 'email' }, { status: 400 });
    }
    if (!role || typeof role !== 'string') {
      return NextResponse.json({ error: 'El rol es obligatorio.', field: 'role' }, { status: 400 });
    }
    if (!documentNumber || typeof documentNumber !== 'string') {
      return NextResponse.json({ error: 'El número de documento es obligatorio.', field: 'documentNumber' }, { status: 400 });
    }
    // Validar role permitido
    const allowedRoles = ['ADMIN', 'DOCENTE', 'ESTUDIANTE', 'STUDENT'];
    if (!allowedRoles.includes(role.toUpperCase())) {
      return NextResponse.json({ error: 'Rol no permitido.', field: 'role' }, { status: 400 });
    }
    // Correo único y formato
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.', field: 'email' }, { status: 400 });
    }
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail && existingEmail.id !== id) {
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    }
    // Documento único y formato
    if (!/^\d{5,}$/.test(documentNumber)) {
      return NextResponse.json({ error: 'El número de documento debe ser numérico y mínimo 5 dígitos.', field: 'documentNumber' }, { status: 400 });
    }
    const existingDoc = await prisma.user.findUnique({ where: { documentNumber } });
    if (existingDoc && existingDoc.id !== id) {
      return NextResponse.json({ error: 'El número de documento ya está registrado.', field: 'documentNumber' }, { status: 400 });
    }
    // Nombre: solo letras y espacios, mínimo 3 caracteres
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(name.trim())) {
      return NextResponse.json({ error: 'El nombre debe tener solo letras y al menos 3 caracteres.', field: 'name' }, { status: 400 });
    }
    // Fecha de nacimiento: no futura, edad mínima 5 años
    if (!birthDate || typeof birthDate !== 'string') {
      return NextResponse.json({ error: 'La fecha de nacimiento es obligatoria.', field: 'birthDate' }, { status: 400 });
    }
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth > now) {
      return NextResponse.json({ error: 'La fecha de nacimiento no puede ser futura.', field: 'birthDate' }, { status: 400 });
    }
    const age = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
    if (age < 5) {
      return NextResponse.json({ error: 'La edad mínima es 5 años.', field: 'birthDate' }, { status: 400 });
    }
    // Teléfono: solo números, 7-10 dígitos, no empieza por 0
    if (!phone || typeof phone !== 'string' || !/^\d{7,10}$/.test(phone) || phone.startsWith('0')) {
      return NextResponse.json({ error: 'El teléfono debe tener entre 7 y 10 dígitos, no empezar por 0.', field: 'phone' }, { status: 400 });
    }
    // Dirección: mínimo 5 caracteres
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return NextResponse.json({ error: 'La dirección debe tener al menos 5 caracteres.', field: 'address' }, { status: 400 });
    }
    // Género: solo M, F, O
    if (!['M', 'F', 'O'].includes(gender)) {
      return NextResponse.json({ error: 'El género debe ser M, F u O.', field: 'gender' }, { status: 400 });
    }
    // Foto: si se envía, debe ser url de imagen (opcional, solo si se usa)
    if (photoUrl && (typeof photoUrl !== 'string' || !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photoUrl))) {
      return NextResponse.json({ error: 'La foto debe ser una URL de imagen válida.', field: 'photoUrl' }, { status: 400 });
    }
    // Mapear role del frontend a enum Prisma
    const roleMap: Record<string, 'ADMIN' | 'DOCENTE' | 'STUDENT'> = {
      'ADMIN': 'ADMIN',
      'admin': 'ADMIN',
      'DOCENTE': 'DOCENTE',
      'docente': 'DOCENTE',
      'ESTUDIANTE': 'STUDENT',
      'estudiante': 'STUDENT',
      'STUDENT': 'STUDENT',
    };
    const prismaRole = roleMap[role] || 'STUDENT';
    // Actualizar usuario en la base de datos
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: prismaRole,
        documentType: documentType || null,
        documentNumber: documentNumber || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        phone: phone || null,
        address: address || null,
        gender: gender || null,
        photoUrl: photoUrl || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        documentType: true,
        documentNumber: true,
        birthDate: true,
        phone: true,
        address: true,
        gender: true,
        photoUrl: true
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al editar usuario:', error);
    return NextResponse.json({ error: 'Error al editar usuario', details: (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error) }, { status: 500 });
  }
}

// DELETE: Elimina un usuario. Body: { id }
export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return NextResponse.json(admin, { status: 403 });
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar usuario' }, { status: 500 });
  }
}

// GET: Devuelve todos los usuarios (id, name, email, role)
export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return NextResponse.json(admin, { status: 403 });
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

// POST: Crea un usuario nuevo en Firebase Auth y en la base de datos. Body: { name, email, role, documentType, documentNumber, birthDate, phone, address, gender, photoUrl }
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return NextResponse.json(admin, { status: 403 });
  try {
    const body = await request.json();
    const {
      name, email, role, documentType, documentNumber, birthDate, phone, address, gender, photoUrl
    } = body || {};

    // Validar campos obligatorios y tipos
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'El nombre es obligatorio.', field: 'name' }, { status: 400 });
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'El correo es obligatorio.', field: 'email' }, { status: 400 });
    }
    if (!role || typeof role !== 'string') {
      return NextResponse.json({ error: 'El rol es obligatorio.', field: 'role' }, { status: 400 });
    }
    if (!documentNumber || typeof documentNumber !== 'string') {
      return NextResponse.json({ error: 'El número de documento es obligatorio.', field: 'documentNumber' }, { status: 400 });
    }

    // Validar role permitido
    const allowedRoles = ['ADMIN', 'DOCENTE', 'ESTUDIANTE'];
    if (!allowedRoles.includes(role.toUpperCase())) {
      return NextResponse.json({ error: 'Rol no permitido.', field: 'role' }, { status: 400 });
    }

    // Validaciones robustas de datos personales en backend
    // Correo único y formato
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.', field: 'email' }, { status: 400 });
    }
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    }
    // Documento único y formato
    if (!/^\d{5,}$/.test(documentNumber)) {
      return NextResponse.json({ error: 'El número de documento debe ser numérico y mínimo 5 dígitos.', field: 'documentNumber' }, { status: 400 });
    }
    const existingDoc = await prisma.user.findUnique({ where: { documentNumber } });
    if (existingDoc) {
      return NextResponse.json({ error: 'El número de documento ya está registrado.', field: 'documentNumber' }, { status: 400 });
    }
    // Nombre: solo letras y espacios, mínimo 3 caracteres
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(name.trim())) {
      return NextResponse.json({ error: 'El nombre debe tener solo letras y al menos 3 caracteres.', field: 'name' }, { status: 400 });
    }
    // Fecha de nacimiento: no futura, edad mínima 5 años
    if (!birthDate || typeof birthDate !== 'string') {
      return NextResponse.json({ error: 'La fecha de nacimiento es obligatoria.', field: 'birthDate' }, { status: 400 });
    }
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth > now) {
      return NextResponse.json({ error: 'La fecha de nacimiento no puede ser futura.', field: 'birthDate' }, { status: 400 });
    }
    const age = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
    if (age < 5) {
      return NextResponse.json({ error: 'La edad mínima es 5 años.', field: 'birthDate' }, { status: 400 });
    }
    // Teléfono: solo números, 7-10 dígitos, no empieza por 0
    if (!phone || typeof phone !== 'string' || !/^\d{7,10}$/.test(phone) || phone.startsWith('0')) {
      return NextResponse.json({ error: 'El teléfono debe tener entre 7 y 10 dígitos, no empezar por 0.', field: 'phone' }, { status: 400 });
    }
    // Dirección: mínimo 5 caracteres
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return NextResponse.json({ error: 'La dirección debe tener al menos 5 caracteres.', field: 'address' }, { status: 400 });
    }
    // Género: solo M, F, O
    if (!['M', 'F', 'O'].includes(gender)) {
      return NextResponse.json({ error: 'El género debe ser M, F u O.', field: 'gender' }, { status: 400 });
    }
    // Foto: si se envía, debe ser url de imagen (opcional, solo si se usa)
    if (photoUrl && (typeof photoUrl !== 'string' || !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photoUrl))) {
      return NextResponse.json({ error: 'La foto debe ser una URL de imagen válida.', field: 'photoUrl' }, { status: 400 });
    }

    // Inicializar Firebase Admin
    initFirebaseAdmin();
    const auth = getAuth();

    // Verificar si el usuario ya existe en Firebase Auth
    try {
      await auth.getUserByEmail(email);
      // Si existe en Firebase, unificar mensaje con el de la base de datos
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    } catch (e) {
      // Si no existe, se crea
    }

    // (Futuro) Validar archivo de foto si se implementa subida

    // Crear usuario en Firebase Auth con la contraseña igual al número de documento
    const createdUser = await auth.createUser({
      email,
      password: documentNumber,
      displayName: name,
      photoURL: photoUrl || undefined,
      emailVerified: false
    });

    // Mapear role del frontend a enum Prisma
    const roleMap: Record<string, 'ADMIN' | 'DOCENTE' | 'STUDENT'> = {
      'ADMIN': 'ADMIN',
      'admin': 'ADMIN',
      'DOCENTE': 'DOCENTE',
      'docente': 'DOCENTE',
      'ESTUDIANTE': 'STUDENT',
      'estudiante': 'STUDENT',
      'STUDENT': 'STUDENT',
    };
    const prismaRole = roleMap[role] || 'STUDENT';

    // Guardar usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: prismaRole,
        firebaseUid: createdUser.uid,
        passwordHash: '',
        documentType: documentType || null,
        documentNumber: documentNumber || null,
        birthDate: birthDate ? new Date(birthDate) : null,
        phone: phone || null,
        address: address || null,
        gender: gender || null,
        photoUrl: photoUrl || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        firebaseUid: true,
        documentType: true,
        documentNumber: true,
        birthDate: true,
        phone: true,
        address: true,
        gender: true,
        photoUrl: true
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json({ error: 'Error al crear usuario', details: (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error) }, { status: 500 });
  }
}
