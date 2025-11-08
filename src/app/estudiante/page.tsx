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

        // Traer horario
        const hRes = await fetch('/api/estudiante/horario', { headers });
        if (!hRes.ok) throw new Error('Error al obtener horario');
        const hData = await hRes.json() as any[];
        setHorario(Array.isArray(hData) ? hData : []);

        // Traer notas
        const nRes = await fetch('/api/estudiante/notas', { headers });
        if (!nRes.ok) throw new Error('Error al obtener notas');
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
                </span>Notas y Asistencia
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

        <div className={styles.gridContainer}>
          {/* Columna izquierda - Tareas y Clases */}
          <div>
            {/* Tareas Pendientes */}
            <div className={styles.activityCard} style={{ marginBottom: '2rem' }}>
              <h2 className={styles.activityTitle}>Tareas Pendientes</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && asignaturas.length === 0 && (
                  <div className={styles.emptyState}>
                    No hay tareas pendientes
                  </div>
                )}
                {!loadingData && asignaturas.map((asignatura, i) => (
                  <div key={i} className={styles.taskItem}>
                    <div className={styles.taskIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.taskContent}>
                      <div className={styles.taskTitle}>
                        Tareas de {asignatura}
                      </div>
                      <div className={styles.taskSubtitle}>
                        {asignatura}
                      </div>
                    </div>
                    <div className={styles.taskStatus}>
                      Pendiente
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas Clases */}
            <div className={styles.activityCard}>
              <h2 className={styles.activityTitle}>Próximas Clases</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && horario.length === 0 && (
                  <div className={styles.emptyState}>
                    No hay clases programadas
                  </div>
                )}
                {!loadingData && horario.map((clase, i) => (
                  <div key={i} className={styles.classItem}>
                    <div className={styles.classContent}>
                      <div className={styles.taskIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className={styles.classTitle}>
                          {clase.materia}
                        </div>
                        <div className={styles.classSubtitle}>
                          {clase.aula ? `Aula: ${clase.aula}` : 'Aula por confirmar'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.classTime}>
                      {clase.hora}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Notificaciones */}
          <div>
            <div className={styles.activityCard}>
              <h2 className={styles.activityTitle}>Resumen de Notas</h2>
              <div style={{ marginTop: '1.5rem' }}>
                {!loadingData && notas.length === 0 && (
                  <div className={styles.emptyState}>
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
                      const color = parseFloat(promedio) >= 3.5 ? 'var(--green-primary)' : 
                                   parseFloat(promedio) >= 3.0 ? '#fbbf24' : '#ef4444';
                      return (
                        <div key={i} className={styles.notificationItem}>
                          <div className={styles.notificationDot} style={{ backgroundColor: color }}></div>
                          <div className={styles.notificationContent}>
                            <div className={styles.notificationTitle}>
                              {materia}
                            </div>
                            <div className={styles.notificationSubtitle}>
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
            <div className={styles.activityCard} style={{ marginTop: '1.5rem' }}>
              <h2 className={styles.activityTitle}>Boletín Académico</h2>
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