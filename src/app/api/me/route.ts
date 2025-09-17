import { NextRequest, NextResponse } from "next/server";
import { getAuth } from 'firebase-admin/auth';
import { prisma } from '@/lib/prisma';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';

initFirebaseAdmin();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { idToken } = body;

    if (!idToken) {
        return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
    }

    try {
        const decodedToken = await getAuth().verifyIdToken(idToken);

        let user = await prisma.user.findUnique({
            where: { firebaseUid: decodedToken.uid },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    firebaseUid: decodedToken.uid,
                    email: decodedToken.email ?? '',
                    role: 'STUDENT',
                    passwordHash: '',
                },
            });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            firebaseUid: user.firebaseUid,
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Token invalido', details: error.message }, { status: 401 });
    }
}