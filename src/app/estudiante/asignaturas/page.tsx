"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import EstudianteLayout from '../../../components/layout/EstudianteLayout';
import styles from '../../../styles/estudiante-dashboard.module.css';
import LoadingModal from '../../../components/ui/LoadingModal';
import useDelayedOpen from '../../../hooks/useDelayedOpen';

export default function AsignaturasPage() {
  const { user } = useAuth();
  const [notas, setNotas] = useState<any[]>([]);
  const [mergedMaterias, setMergedMaterias] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const delayedOpen = useDelayedOpen(loading);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    user.getIdToken().then(async (token) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        // Traer notas y horario en paralelo
        const [nRes, hRes] = await Promise.all([
          fetch('/api/estudiante/notas', { headers }),
          fetch('/api/estudiante/horario', { headers })
        ]);
        if (!nRes.ok) throw new Error('Error al obtener notas');
        if (!hRes.ok) throw new Error('Error al obtener horario');
        const nData = await nRes.json();
        const hData = await hRes.json();
        setNotas(Array.isArray(nData) ? nData : []);

        // Construir mapa de materias: tomar nombres desde horario y desde notas
        const materiasFromHorario = Array.isArray(hData) ? Array.from(new Set(hData.map((h: any) => String(h.materia)))) : [];
        const materiasFromNotas = Array.isArray(nData) ? Array.from(new Set(nData.map((n: any) => n.materia?.nombre).filter(Boolean))) : [];
        // Unir ambas listas
        const union = Array.from(new Set([...materiasFromHorario, ...materiasFromNotas]));

        // Si hay materias sin notas, las incluimos en el objeto materias con array vacío
        const notasMap = (Array.isArray(nData) ? nData : []).reduce((acc: any, cur: any) => {
          const nombre = cur.materia?.nombre || 'Sin materia';
          if (!acc[nombre]) acc[nombre] = [];
          acc[nombre].push(cur);
          return acc;
        }, {} as Record<string, any[]>);

        // Construir objeto final garantizando todas las materias del union
        const merged: Record<string, any[]> = {};
        union.forEach((m: string) => {
          merged[m] = notasMap[m] || [];
        });

        setNotas(Array.isArray(nData) ? nData : []);
        setMergedMaterias(merged);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }).catch(err => { setError('No se pudo obtener token'); setLoading(false); });
  }, [user]);

  // Recuperar las materias mergeadas que construimos en el effect
  const materias = Object.keys(mergedMaterias).length ? mergedMaterias : notas.reduce((acc: any, n: any) => {
    const nombre = n.materia?.nombre || 'Sin materia';
    if (!acc[nombre]) acc[nombre] = [];
    acc[nombre].push(n);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <EstudianteLayout 
      title="Mis Asignaturas" 
      subtitle="Consulta tus materias y el progreso académico de cada una"
    >
      <LoadingModal open={delayedOpen} message="Cargando asignaturas..." />
      
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

      {!loading && Object.keys(materias).length === 0 && (
        <div className={styles.activityCard}>
          <div className={styles.emptyState}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem', opacity: 0.5 }}>
              <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#cbd5e1' }}>No hay asignaturas disponibles</h3>
            <p style={{ margin: 0, color: '#94a3b8' }}>Aún no tienes materias asignadas.</p>
          </div>
        </div>
      )}

      <div className={styles.gridContainer}>
        {Object.entries(materias).map(([mat, arr], i) => {
          const promedio = (arr as any[]).length > 0 
            ? ((arr as any[]).reduce((s: number, it: any) => s + (it.valor || 0), 0) / (arr as any[]).length).toFixed(2)
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
                      <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className={styles.activityTitle} style={{ margin: 0, fontSize: '1.25rem' }}>{mat}</h3>
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
                {(arr as any[]).length === 0 ? (
                  <div className={styles.emptyState}>
                    Sin notas registradas
                  </div>
                ) : (
                  (arr as any[]).map((nota: any, idx: number) => (
                    <div key={idx} className={styles.taskItem}>
                      <div className={styles.taskContent}>
                        <div className={styles.taskTitle}>
                          {nota.periodo?.nombre || 'Periodo'}
                        </div>
                        <div className={styles.taskSubtitle}>
                          Evaluación académica
                        </div>
                      </div>
                      <div 
                        style={{ 
                          fontWeight: '700', 
                          color: (nota.valor || 0) >= 3.5 ? '#22c55e' : 
                                 (nota.valor || 0) >= 3.0 ? '#fbbf24' : '#ef4444',
                          fontSize: '1.25rem'
                        }}
                      >
                        {nota.valor ?? '-'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </EstudianteLayout>
  );
}
