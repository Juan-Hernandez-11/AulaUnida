import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Aquí puedes agregar más checks si quieres
    // Por ejemplo, verificar conexión a la base de datos
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'AulaUnida API'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Service check failed'
      },
      { status: 503 }
    );
  }
}