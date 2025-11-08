"use client";

import BoletinPDF from "./BoletinPDF";
import { useAuth } from "../../../context/authContext";
import EstudianteLayout from '../../../components/layout/EstudianteLayout';
import styles from '../../../styles/estudiante-dashboard.module.css';

export default function BoletinPage() {
  const { user } = useAuth();
  const cicloId = 1; // por ahora fijo, podría venir de user/selección

  return (
    <EstudianteLayout 
      title="Boletín Académico" 
      subtitle="Descarga tu reporte académico completo en formato PDF"
    >
      <div className={styles.activityCard}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div className={styles.taskIcon} style={{ marginRight: '1rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className={styles.activityTitle} style={{ margin: 0, fontSize: '1.25rem' }}>
            Generar Boletín
          </h3>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
            El boletín académico contiene un resumen completo de tu desempeño estudiantil, 
            incluyendo todas las calificaciones, promedios por materia y observaciones del período académico.
          </p>
          
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.1)', 
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem', color: '#22c55e' }}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontWeight: '600', color: '#22c55e' }}>Información incluida:</span>
            </div>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.5rem', 
              color: '#cbd5e1',
              lineHeight: '1.5'
            }}>
              <li>Todas las calificaciones por materia y período</li>
              <li>Promedios individuales y general</li>
              <li>Registro de asistencia</li>
              <li>Observaciones académicas</li>
              <li>Información personal y de contacto</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '2rem 0',
          borderTop: '1px solid #334155',
          marginTop: '2rem'
        }}>
          <BoletinPDF cicloId={cicloId} estudianteUid={user?.uid} />
        </div>
      </div>

      {/* Información adicional */}
      <div className={styles.activityCard} style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            marginRight: '1rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2"/>
              <path d="M9.09 9A3 3 0 0 1 12 6" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17V12" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem' }}>
            Información Importante
          </h3>
        </div>
        
        <div style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            • El boletín se genera en tiempo real con la información más actualizada de tu expediente académico.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            • El documento PDF es oficial y puede ser utilizado para trámites administrativos.
          </p>
          <p style={{ margin: '0 0 1rem 0' }}>
            • Si encuentras algún error en la información, contacta a la coordinación académica.
          </p>
          <p style={{ margin: 0 }}>
            • El archivo se descarga automáticamente al hacer clic en "Descargar Boletín".
          </p>
        </div>
      </div>
    </EstudianteLayout>
  );
}
