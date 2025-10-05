// PUT: Editar docente (igual que usuarios, pero solo rol DOCENTE)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id, name, email, documentType, documentNumber, birthDate, phone, address, gender, photoUrl
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
    if (!documentNumber || typeof documentNumber !== 'string') {
      return NextResponse.json({ error: 'El número de documento es obligatorio.', field: 'documentNumber' }, { status: 400 });
    }
    // Validaciones robustas
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.', field: 'email' }, { status: 400 });
    }
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail && existingEmail.id !== id) {
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    }
    if (!/^\d{5,}$/.test(documentNumber)) {
      return NextResponse.json({ error: 'El número de documento debe ser numérico y mínimo 5 dígitos.', field: 'documentNumber' }, { status: 400 });
    }
    const existingDoc = await prisma.user.findUnique({ where: { documentNumber } });
    if (existingDoc && existingDoc.id !== id) {
      return NextResponse.json({ error: 'El número de documento ya está registrado.', field: 'documentNumber' }, { status: 400 });
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(name.trim())) {
      return NextResponse.json({ error: 'El nombre debe tener solo letras y al menos 3 caracteres.', field: 'name' }, { status: 400 });
    }
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
    if (!phone || typeof phone !== 'string' || !/^\d{7,10}$/.test(phone) || phone.startsWith('0')) {
      return NextResponse.json({ error: 'El teléfono debe tener entre 7 y 10 dígitos, no empezar por 0.', field: 'phone' }, { status: 400 });
    }
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return NextResponse.json({ error: 'La dirección debe tener al menos 5 caracteres.', field: 'address' }, { status: 400 });
    }
    if (!['M', 'F', 'O'].includes(gender)) {
      return NextResponse.json({ error: 'El género debe ser M, F u O.', field: 'gender' }, { status: 400 });
    }
    if (photoUrl && (typeof photoUrl !== 'string' || !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photoUrl))) {
      return NextResponse.json({ error: 'La foto debe ser una URL de imagen válida.', field: 'photoUrl' }, { status: 400 });
    }
    // Actualizar docente en la base de datos (siempre rol DOCENTE)
    const docente = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: 'DOCENTE',
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
    return NextResponse.json(docente);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar docente', details: (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error) }, { status: 500 });
  }
}

// DELETE: Eliminar docente
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar docente' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';

const prisma = new PrismaClient();

// GET: Lista todos los docentes (básico, para admin)
export async function GET() {
  try {
    const docentes = await prisma.user.findMany({
      where: { role: 'DOCENTE' },
      select: {
        id: true,
        name: true,
        email: true,
        documentType: true,
        documentNumber: true,
        birthDate: true,
        phone: true,
        address: true,
        gender: true,
        photoUrl: true,
        role: true,
      },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(docentes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener docentes' }, { status: 500 });
  }
}

// POST: Registrar docente (igual que usuarios, pero forzando rol DOCENTE)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name, email, documentType, documentNumber, birthDate, phone, address, gender, photoUrl
    } = body || {};

    // Validar campos obligatorios y tipos
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'El nombre es obligatorio.', field: 'name' }, { status: 400 });
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'El correo es obligatorio.', field: 'email' }, { status: 400 });
    }
    if (!documentNumber || typeof documentNumber !== 'string') {
      return NextResponse.json({ error: 'El número de documento es obligatorio.', field: 'documentNumber' }, { status: 400 });
    }

    // Validaciones robustas de datos personales en backend
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Correo electrónico inválido.', field: 'email' }, { status: 400 });
    }
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    }
    if (!/^\d{5,}$/.test(documentNumber)) {
      return NextResponse.json({ error: 'El número de documento debe ser numérico y mínimo 5 dígitos.', field: 'documentNumber' }, { status: 400 });
    }
    const existingDoc = await prisma.user.findUnique({ where: { documentNumber } });
    if (existingDoc) {
      return NextResponse.json({ error: 'El número de documento ya está registrado.', field: 'documentNumber' }, { status: 400 });
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(name.trim())) {
      return NextResponse.json({ error: 'El nombre debe tener solo letras y al menos 3 caracteres.', field: 'name' }, { status: 400 });
    }
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
    if (!phone || typeof phone !== 'string' || !/^\d{7,10}$/.test(phone) || phone.startsWith('0')) {
      return NextResponse.json({ error: 'El teléfono debe tener entre 7 y 10 dígitos, no empezar por 0.', field: 'phone' }, { status: 400 });
    }
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
      return NextResponse.json({ error: 'La dirección debe tener al menos 5 caracteres.', field: 'address' }, { status: 400 });
    }
    if (!['M', 'F', 'O'].includes(gender)) {
      return NextResponse.json({ error: 'El género debe ser M, F u O.', field: 'gender' }, { status: 400 });
    }
    if (photoUrl && (typeof photoUrl !== 'string' || !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(photoUrl))) {
      return NextResponse.json({ error: 'La foto debe ser una URL de imagen válida.', field: 'photoUrl' }, { status: 400 });
    }

    // Inicializar Firebase Admin
    initFirebaseAdmin();
    const auth = getAuth();

    // Verificar si el usuario ya existe en Firebase Auth
    try {
      await auth.getUserByEmail(email);
      return NextResponse.json({ error: 'El correo ya está registrado.', field: 'email' }, { status: 400 });
    } catch (e) {
      // Si no existe, se crea
    }

    // Crear usuario en Firebase Auth con la contraseña igual al número de documento
    const createdUser = await auth.createUser({
      email,
      password: documentNumber,
      displayName: name,
      photoURL: photoUrl || undefined,
      emailVerified: false
    });

    // Guardar usuario en la base de datos
    const docente = await prisma.user.create({
      data: {
        name,
        email,
        role: 'DOCENTE',
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
    return NextResponse.json(docente);
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar docente', details: (error && typeof error === 'object' && 'message' in error) ? (error as any).message : String(error) }, { status: 500 });
  }
}
