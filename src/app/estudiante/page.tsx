"use client";

import BoletinPDF from "./boletin/BoletinPDF";
import { useAuth } from "../../context/authContext";
import styles from "../../styles/estudiante-dashboard.module.css";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';
import LoadingModal from '../../components/ui/LoadingModal';
import useDelayedOpen from '../../hooks/useDelayedOpen';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
  primary: '#10b981', secondary: '#06b6d4', accent: '#f59e0b',
  danger: '#ef4444', success: '#10b981', bg: '#0f0f0f',
  surface: '#1b1b1b', text: '#ffffff', textMuted: '#9ca3af'
};

const CHART_COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];

export default function EstudianteDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [cicloId] = useState(1);
  const [horario, setHorario] = useState<Array<any>>([]);
  const [notas, setNotas] = useState<Array<any>>([]);
  const [asignaturas, setAsignaturas] = useState<Array<string>>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const delayedOpen = useDelayedOpen(loading);
  const delayedDataOpen = useDelayedOpen(loadingData);
  
  useEffect(() => {
    // Cuando el usuario esté disponible, traemos horario y notas
    const fetchData = async () => {
      if (!user) return;
      setLoadingData(true);
      setError(null);
      try {
        const token = await user.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };

        // Primero, intentar inicializar matriculación si es necesaria
        try {
          await fetch('/api/estudiante/init-data', { 
            method: 'POST',
            headers 
          });
        } catch (e) {
          // Ignorar error de inicialización, solo continuar
          console.log('Init-data skipped or already initialized');
        }

        // Traer horario
        const hRes = await fetch('/api/estudiante/horario', { headers });
        if (!hRes.ok) throw new Error('Error al obtener horario');
        const hData = await hRes.json() as any[];
        setHorario(Array.isArray(hData) ? hData : []);

        // Traer notas
        const nRes = await fetch('/api/estudiante/notas', { headers });
        if (!nRes.ok) {
          const errorText = await nRes.text();
          console.error('Error al obtener notas:', nRes.status, errorText);
          throw new Error(`Error al obtener notas: ${nRes.status} - ${errorText}`);
        }
        const nData = await nRes.json() as any[];
        setNotas(Array.isArray(nData) ? nData : []);

        // Derivar asignaturas: tomar de horario primero, si no, de notas
        const materiasFromHorario = Array.from(new Set((hData || []).map((h: any) => String(h.materia)))) as string[];
        if (materiasFromHorario.length) {
          setAsignaturas(materiasFromHorario as string[]);
        } else {
          const materiasFromNotas = Array.from(new Set((nData || []).map((n: any) => n.materia?.nombre).filter(Boolean)));
          setAsignaturas(materiasFromNotas as string[]);
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error cargando datos');
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div className={styles.loadingContainer}><LoadingModal open={delayedOpen} message="Cargando..." /></div>;
  if (!user) return <div className={styles.loadingContainer}><h2>Bienvenido a AulaUnida</h2><p>Por favor inicia sesión.</p></div>;

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="/favicon.ico" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>

        {/* User Info Section */}
        <div style={{
          backgroundColor: '#10b98120',
          border: '1px solid #10b98130',
          borderRadius: '0.75rem',
          padding: '0.75rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.25rem',
            flexShrink: 0,
            border: '2px solid #10b98140'
          }}>
            {user?.displayName?.charAt(0)?.toUpperCase() || '🎓'}
          </div>
          <div style={{flex: 1, minWidth: 0}}>
            <p style={{margin: 0, fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {user?.displayName || 'Usuario'}
            </p>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#10b981',
              color: '#ffffff',
              padding: '0.2rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '0.25rem'
            }}>
              🎓 Estudiante
            </div>
          </div>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link href="/estudiante" className={`${styles.menuItem} ${styles.menuItemActive}`}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Inicio
              </Link>
            </li>
            <li>
              <Link href="/estudiante/tareas" className={styles.menuItem}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Mis Tareas
              </Link>
            </li>
            <li>
              <Link href="/estudiante/asignaturas" className={styles.menuItem}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Asignaturas
              </Link>
            </li>
            <li>
              <Link href="/estudiante/notas" className={styles.menuItem}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H16L22 8V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Notas
              </Link>
            </li>
            <li>
              <Link href="/estudiante/asistencia" className={styles.menuItem}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Asistencia
              </Link>
            </li>
            <li>
              <Link href="/estudiante/boletin" className={styles.menuItem}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Boletín
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={async () => { await logout(); router.push('/login'); }} className={styles.logoutBtn}>
          <span style={{ marginRight: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span> Cerrar sesión
        </button>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Panel de Estudiante</h1>
        <p className={styles.subtitle}>Bienvenida de nuevo, {user.displayName?.split(' ')[0] || 'estudiante'}.</p>

        {/* Métricas Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {!loadingData && notas.length > 0 && (
            <>
              <div style={{
                background: `linear-gradient(135deg, ${COLORS.surface} 0%, rgba(16, 185, 129, 0.05) 100%)`,
                border: `1px solid rgba(16, 185, 129, 0.2)`, padding: '1.5rem',
                borderRadius: '0.75rem', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', transition: 'all 0.3s ease', cursor: 'pointer'
              }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div>
                  <div style={{ color: COLORS.textMuted, fontSize: '0.875rem', fontWeight: 500 }}>Promedio General</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.primary, marginTop: '0.25rem' }}>
                    {(notas.reduce((sum: number, n: any) => sum + (n.valor || 0), 0) / Math.max(notas.length, 1)).toFixed(1)}
                  </div>
                </div>
                <span style={{ fontSize: '2rem', opacity: 0.5 }}>📊</span>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${COLORS.surface} 0%, rgba(96, 165, 250, 0.05) 100%)`,
                border: `1px solid rgba(96, 165, 250, 0.2)`, padding: '1.5rem',
                borderRadius: '0.75rem', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', transition: 'all 0.3s ease', cursor: 'pointer'
              }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div>
                  <div style={{ color: COLORS.textMuted, fontSize: '0.875rem', fontWeight: 500 }}>Materias Activas</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.secondary, marginTop: '0.25rem' }}>
                    {asignaturas.length}
                  </div>
                </div>
                <span style={{ fontSize: '2rem', opacity: 0.5 }}>🎓</span>
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${COLORS.surface} 0%, rgba(245, 158, 11, 0.05) 100%)`,
                border: `1px solid rgba(245, 158, 11, 0.2)`, padding: '1.5rem',
                borderRadius: '0.75rem', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', transition: 'all 0.3s ease', cursor: 'pointer'
              }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div>
                  <div style={{ color: COLORS.textMuted, fontSize: '0.875rem', fontWeight: 500 }}>Total de Notas</div>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.accent, marginTop: '0.25rem' }}>
                    {notas.length}
                  </div>
                </div>
                <span style={{ fontSize: '2rem', opacity: 0.5 }}>📝</span>
              </div>
            </>
          )}
        </div>

        {/* Gráfico de Desempeño */}
        {!loadingData && notas.length > 0 && (
          <div style={{
            background: COLORS.surface, border: `1px solid rgba(255, 255, 255, 0.1)`,
            borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem'
          }}>
            <h2 style={{ color: COLORS.text, fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Promedio por Materia</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(notas.reduce((acc: any, cur: any) => {
                    const nombre = cur.materia?.nombre || 'Sin materia';
                    if (!acc[nombre]) acc[nombre] = { suma: 0, cantidad: 0 };
                    acc[nombre].suma += cur.valor || 0;
                    acc[nombre].cantidad += 1;
                    return acc;
                  }, {})).map(([materia, datos]: any) => ({
                    name: materia,
                    value: parseFloat(((datos as any).suma / (datos as any).cantidad).toFixed(1))
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill={COLORS.primary}
                  dataKey="value"
                >
                  {Object.entries(notas.reduce((acc: any, cur: any) => {
                    const nombre = cur.materia?.nombre || 'Sin materia';
                    if (!acc[nombre]) acc[nombre] = { suma: 0, cantidad: 0 };
                    acc[nombre].suma += cur.valor || 0;
                    acc[nombre].cantidad += 1;
                    return acc;
                  }, {})).map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Quick Access Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            background: COLORS.surface, border: `1px solid rgba(16, 185, 129, 0.2)`,
            borderRadius: '0.75rem', padding: '1.5rem', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; (e.currentTarget as any).style.borderColor = COLORS.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; (e.currentTarget as any).style.borderColor = 'rgba(16, 185, 129, 0.2)'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: COLORS.text }}>Mis Tareas</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '0.875rem' }}>Ver tareas asignadas y entregas</p>
            <Link href="/estudiante/tareas" style={{ color: COLORS.primary, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.75rem', display: 'block' }}>
              Ir a tareas →
            </Link>
          </div>

          <div style={{
            background: COLORS.surface, border: `1px solid rgba(6, 182, 212, 0.2)`,
            borderRadius: '0.75rem', padding: '1.5rem', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; (e.currentTarget as any).style.borderColor = COLORS.secondary; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; (e.currentTarget as any).style.borderColor = 'rgba(6, 182, 212, 0.2)'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📚</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: COLORS.text }}>Asignaturas</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '0.875rem' }}>Ver mis materias y docentes</p>
            <Link href="/estudiante/asignaturas" style={{ color: COLORS.secondary, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.75rem', display: 'block' }}>
              Ver asignaturas →
            </Link>
          </div>

          <div style={{
            background: COLORS.surface, border: `1px solid rgba(245, 158, 11, 0.2)`,
            borderRadius: '0.75rem', padding: '1.5rem', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; (e.currentTarget as any).style.borderColor = COLORS.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; (e.currentTarget as any).style.borderColor = 'rgba(245, 158, 11, 0.2)'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏆</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: COLORS.text }}>Notas</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '0.875rem' }}>Ver mis calificaciones</p>
            <Link href="/estudiante/notas" style={{ color: COLORS.accent, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.75rem', display: 'block' }}>
              Mis notas →
            </Link>
          </div>

          <div style={{
            background: COLORS.surface, border: `1px solid rgba(239, 68, 68, 0.2)`,
            borderRadius: '0.75rem', padding: '1.5rem', cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; (e.currentTarget as any).style.borderColor = COLORS.danger; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; (e.currentTarget as any).style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📄</div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: COLORS.text }}>Boletín</h3>
            <p style={{ color: COLORS.textMuted, fontSize: '0.875rem' }}>Descargar boletín académico</p>
            <Link href="/estudiante/boletin" style={{ color: COLORS.danger, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.75rem', display: 'block' }}>
              Ver boletín →
            </Link>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {/* Columna izquierda - Tareas y Clases */}
          <div>
            {/* Tareas Pendientes */}
            <div className={styles.activityCard} style={{ marginBottom: '2rem', background: COLORS.surface, border: `1px solid rgba(255, 255, 255, 0.1)` }}>
              <h2 className={styles.activityTitle} style={{ color: COLORS.text }}>Tareas Pendientes</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && asignaturas.length === 0 && (
                  <div className={styles.emptyState} style={{ color: COLORS.textMuted }}>
                    No hay tareas pendientes
                  </div>
                )}
                {!loadingData && asignaturas.map((asignatura, i) => (
                  <div key={i} className={styles.taskItem} style={{ borderLeftColor: CHART_COLORS[i % CHART_COLORS.length] }}>
                    <div className={styles.taskIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle} style={{ color: COLORS.text }}>
                        Tareas de {asignatura}
                      </div>
                      <div className={styles.taskSubtitle} style={{ color: COLORS.textMuted }}>
                        {asignatura}
                      </div>
                    </div>
                    <div className={styles.taskStatus} style={{ color: COLORS.accent }}>
                      Pendiente
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas Clases */}
            <div className={styles.activityCard} style={{ background: COLORS.surface, border: `1px solid rgba(255, 255, 255, 0.1)` }}>
              <h2 className={styles.activityTitle} style={{ color: COLORS.text }}>Próximas Clases</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && horario.length === 0 && (
                  <div className={styles.emptyState} style={{ color: COLORS.textMuted }}>
                    No hay clases programadas
                  </div>
                )}
                {!loadingData && horario.map((clase, i) => (
                  <div key={i} className={styles.classItem} style={{ borderLeftColor: CHART_COLORS[i % CHART_COLORS.length] }}>
                    <div className={styles.classContent}>
                      <div className={styles.taskIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={COLORS.primary} strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className={styles.classTitle} style={{ color: COLORS.text }}>
                          {clase.materia}
                        </div>
                        <div className={styles.classSubtitle} style={{ color: COLORS.textMuted }}>
                          {clase.aula ? `Aula: ${clase.aula}` : 'Aula por confirmar'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.classTime} style={{ color: COLORS.textMuted }}>
                      {clase.hora}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Notificaciones */}
          <div>
            <div className={styles.activityCard} style={{ background: COLORS.surface, border: `1px solid rgba(255, 255, 255, 0.1)` }}>
              <h2 className={styles.activityTitle} style={{ color: COLORS.text }}>Resumen de Notas</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && notas.length === 0 && (
                  <div className={styles.emptyState} style={{ color: COLORS.textMuted }}>
                    No hay notas disponibles
                  </div>
                )}
                {!loadingData && notas.length > 0 && (
                  <div>
                    {/* Agrupar por materia y calcular promedio */}
                    {Object.entries(notas.reduce((acc: any, cur: any) => {
                      const nombre = cur.materia?.nombre || 'Sin materia';
                      if (!acc[nombre]) acc[nombre] = { suma: 0, cantidad: 0 };
                      acc[nombre].suma += cur.valor || 0;
                      acc[nombre].cantidad += 1;
                      return acc;
                    }, {})).map(([materia, datos]: any, i) => {
                      const promedio = (datos.suma / datos.cantidad).toFixed(2);
                      const color = parseFloat(promedio) >= 3.5 ? COLORS.success : 
                                   parseFloat(promedio) >= 3.0 ? COLORS.accent : COLORS.danger;
                      return (
                        <div key={i} className={styles.notificationItem} style={{ borderLeftColor: color }}>
                          <div className={styles.notificationDot} style={{ backgroundColor: color }}></div>
                          <div className={styles.notificationContent}>
                            <div className={styles.notificationTitle} style={{ color: COLORS.text }}>
                              {materia}
                            </div>
                            <div className={styles.notificationSubtitle} style={{ color: COLORS.textMuted }}>
                              Promedio: {promedio} ({datos.cantidad} {datos.cantidad === 1 ? 'nota' : 'notas'})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Acceso rápido al boletín */}
            <div className={styles.activityCard} style={{ marginTop: '1.5rem', background: COLORS.surface, border: `1px solid rgba(255, 255, 255, 0.1)` }}>
              <h2 className={styles.activityTitle} style={{ color: COLORS.text }}>Boletín Académico</h2>
              <div style={{ marginTop: '1rem' }}>
                <BoletinPDF cicloId={cicloId} />
              </div>
            </div>
          </div>
        </div>

        {/* centralized loading modal for data fetches */}
        <LoadingModal open={delayedDataOpen} message="Cargando datos..." />
      </main>
    </div>
  );
}