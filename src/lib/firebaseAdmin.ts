import { initializeApp, getApps, cert } from 'firebase-admin/app';

export function initFirebaseAdmin() {
  if (!getApps().length) {
    // Procesar la private key: convertir \n literales a saltos de línea reales
    let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
    // Soporta tanto \\n como \n
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/\\\\n/g, '\n');
    
    const config = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    };

    // Validar que todas las variables estén presentes
    if (!config.projectId || !config.clientEmail || !config.privateKey) {
      throw new Error(
        `Firebase Admin config incomplete. projectId: ${!!config.projectId}, clientEmail: ${!!config.clientEmail}, privateKey: ${!!config.privateKey}`
      );
    }

    initializeApp({
      credential: cert(config),
    });
  }
}