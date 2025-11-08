"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import EstudianteLayout from '../../../components/layout/EstudianteLayout';
import styles from '../../../styles/estudiante-dashboard.module.css';
import LoadingModal from '../../../components/ui/LoadingModal';
import useDelayedOpen from '../../../hooks/useDelayedOpen';

export default function NotasPage() {
  const { user } = useAuth();
  const [notas, setNotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const delayedOpen = useDelayedOpen(loading);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    user.getIdToken().then(async (token) => {
      try {
        const response = await fetch('/api/estudiante/notas', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        if (!response.ok) throw new Error('Error al obtener notas');
        const data = await response.json();
        setNotas(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error cargando notas');
      } finally {
        setLoading(false);
      }
    }).catch(err => {
      setError('No se pudo obtener token');
      setLoading(false);
    });
  }, [user]);

  // Agrupar notas por materia
  const notasPorMateria = notas.reduce((acc: any, nota: any) => {
    const nombreMateria = nota.materia?.nombre || 'Sin materia';
    if (!acc[nombreMateria]) {
      acc[nombreMateria] = [];
    }
    acc[nombreMateria].push(nota);
    return acc;
  }, {});

  return (
    <EstudianteLayout 
      title="Notas y Asistencia" 
      subtitle="Consulta todas tus calificaciones y registro de asistencia"
    >
      <LoadingModal open={delayedOpen} message="Cargando notas..." />
      
      {error && (
        <div className={styles.activityCard} style={{ marginBottom: '2rem', border: '1px solid #ef4444' }}>
          <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '0.5rem' }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading && notas.length === 0 && (
        <div className={styles.activityCard}>
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem', opacity: 0.5 }}>
              <path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H16L22 8V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#cbd5e1' }}>No hay notas registradas</h3>
            <p style={{ margin: 0, color: '#94a3b8' }}>Aún no tienes calificaciones disponibles.</p>
          </div>
        </div>
      )}

      {!loading && notas.length > 0 && (
        <div className={styles.gridContainer}>
          {Object.entries(notasPorMateria).map(([materia, notasMateria], i) => {
            const promedio = (notasMateria as any[]).length > 0 
              ? ((notasMateria as any[]).reduce((sum, nota) => sum + (nota.valor || 0), 0) / (notasMateria as any[]).length).toFixed(2)
              : '0.00';
            const promedioNum = parseFloat(promedio);
            const colorPromedio = promedioNum >= 3.5 ? '#22c55e' : 
                                 promedioNum >= 3.0 ? '#fbbf24' : '#ef4444';
            
            return (
              <div key={i} className={styles.activityCard} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={styles.taskIcon} style={{ marginRight: '1rem' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className={styles.activityTitle} style={{ margin: 0, fontSize: '1.25rem' }}>{materia}</h3>
                  </div>
                  <div style={{ 
                    background: colorPromedio, 
                    color: '#0f172a', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '1rem',
                    fontWeight: '700',
                    fontSize: '0.875rem'
                  }}>
                    Promedio: {promedio}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(notasMateria as any[]).map((nota: any, idx: number) => (
                    <div key={idx} className={styles.taskItem}>
                      <div className={styles.taskContent}>
                        <div className={styles.taskTitle}>
                          {nota.periodo?.nombre || 'Periodo sin nombre'}
                        </div>
                        <div className={styles.taskSubtitle}>
                          {new Date(nota.createdAt || Date.now()).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div 
                          style={{ 
                            fontWeight: '700', 
                            color: (nota.valor || 0) >= 3.5 ? '#22c55e' : 
                                   (nota.valor || 0) >= 3.0 ? '#fbbf24' : '#ef4444',
                            fontSize: '1.5rem',
                            minWidth: '3rem',
                            textAlign: 'center'
                          }}
                        >
                          {nota.valor ?? '-'}
                        </div>
                        <div style={{ 
                          background: (nota.valor || 0) >= 3.5 ? 'rgba(34, 197, 94, 0.1)' : 
                                     (nota.valor || 0) >= 3.0 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: (nota.valor || 0) >= 3.5 ? '#22c55e' : 
                                 (nota.valor || 0) >= 3.0 ? '#fbbf24' : '#ef4444',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {(nota.valor || 0) >= 3.5 ? 'Excelente' : 
                           (nota.valor || 0) >= 3.0 ? 'Aprobado' : 'Necesita mejora'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabla tradicional como alternativa */}
      {!loading && notas.length > 0 && (
        <div className={styles.activityCard} style={{ marginTop: '2rem' }}>
          <h3 className={styles.activityTitle}>Tabla de Notas Completa</h3>
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155' }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    color: '#f8fafc',
                    fontWeight: '600',
                    background: '#334155'
                  }}>
                    Materia
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    color: '#f8fafc',
                    fontWeight: '600',
                    background: '#334155'
                  }}>
                    Periodo
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    color: '#f8fafc',
                    fontWeight: '600',
                    background: '#334155'
                  }}>
                    Nota
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    color: '#f8fafc',
                    fontWeight: '600',
                    background: '#334155'
                  }}>
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {notas.map((nota, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '1rem', color: '#f8fafc' }}>
                      {nota.materia?.nombre || 'Sin materia'}
                    </td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>
                      {nota.periodo?.nombre || 'Sin periodo'}
                    </td>
                    <td style={{ 
                      padding: '1rem', 
                      textAlign: 'center',
                      color: (nota.valor || 0) >= 3.5 ? '#22c55e' : 
                             (nota.valor || 0) >= 3.0 ? '#fbbf24' : '#ef4444',
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}>
                      {nota.valor ?? '-'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        background: (nota.valor || 0) >= 3.5 ? 'rgba(34, 197, 94, 0.1)' : 
                                   (nota.valor || 0) >= 3.0 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: (nota.valor || 0) >= 3.5 ? '#22c55e' : 
                               (nota.valor || 0) >= 3.0 ? '#fbbf24' : '#ef4444',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {(nota.valor || 0) >= 3.5 ? 'Excelente' : 
                         (nota.valor || 0) >= 3.0 ? 'Aprobado' : 'Reprobado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </EstudianteLayout>
  );
}
