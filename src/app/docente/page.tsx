"use client";
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarIcon, BookOpenIcon, HomeIcon } from '@heroicons/react/24/outline';
import NextLink from '../../components/NextLink';
import styles from '../../styles/admin-dashboard.module.css';

const sidebarLinks = [
  { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
  { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
  { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
];

export default function DocenteDashboard() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [docenteInfo, setDocenteInfo] = useState<any>(null);
  const [resumen, setResumen] = useState({
    totalAsignaciones: 0,
    gradosActivos: 0,
    materiasAsignadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Cargar información del docente
    const loadDocenteInfo = async () => {
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/docente/info', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setDocenteInfo(data.docente);
          setResumen(data.resumen);
        }
      } catch (error) {
        console.error('Error cargando información del docente:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocenteInfo();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const metricsLabels = [
    { label: 'Total Asignaciones', key: 'totalAsignaciones' },
    { label: 'Grados Activos', key: 'gradosActivos' },
    { label: 'Materias Asignadas', key: 'materiasAsignadas' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Docente" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarLinks.map((link, idx) => (
              <li key={link.label}>
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente' ? styles.menuItemActive : ''}`}>
                  <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Panel del Docente</h1>
        {docenteInfo ? (
          <p className={styles.subtitle}>Bienvenido, {docenteInfo.name}</p>
        ) : (
          <p className={styles.subtitle}>Bienvenido, aquí tienes un resumen de tus asignaciones.</p>
        )}

        {/* Loader y datos reales */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
            <span style={{ color: '#B0B3B8', fontSize: '1.125rem' }}>Cargando datos...</span>
          </div>
        ) : (
          <>
            {/* Métricas */}
            <div className={styles.metricsGrid}>
              {metricsLabels.map((m) => (
                <div key={m.label} className={styles.metricCard}>
                  <span className={styles.metricLabel}>{m.label}</span>
                  <span className={styles.metricValue}>{resumen ? resumen[m.key as keyof typeof resumen] : '-'}</span>
                </div>
              ))}
            </div>

            {/* Accesos rápidos */}
            <div className={styles.activityCard}>
              <h2 className={styles.activityTitle}>Accesos Rápidos</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <NextLink href="/docente/horarios" className={styles.quickAccessCard} style={{ textDecoration: 'none' }}>
                  <CalendarIcon style={{ width: 32, height: 32, marginBottom: '0.5rem' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Ver Mi Horario</h3>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.875rem' }}>Consulta tu horario de clases</p>
                </NextLink>
                
                <NextLink href="/docente/notas" className={styles.quickAccessCard} style={{ textDecoration: 'none' }}>
                  <BookOpenIcon style={{ width: 32, height: 32, marginBottom: '0.5rem' }} />
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>Asignar Notas</h3>
                  <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.875rem' }}>Gestiona las calificaciones de tus estudiantes</p>
                </NextLink>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
