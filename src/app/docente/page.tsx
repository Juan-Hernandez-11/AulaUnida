"use client";
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarIcon, BookOpenIcon, HomeIcon, CheckCircleIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import NextLink from '../../components/NextLink';
import styles from '../../styles/admin-dashboard.module.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const sidebarLinks = [
  { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
  { label: 'Mis Tareas', icon: CheckCircleIcon, href: '/docente/tareas' },
  { label: 'Asistencia', icon: UserGroupIcon, href: '/docente/asistencia' },
  { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
  { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
];

// Paleta de colores
const COLORS = {
  primary: '#10b981',
  secondary: '#06b6d4',
  accent: '#f59e0b',
  danger: '#ef4444',
  success: '#10b981',
  bg: '#0f0f0f',
  surface: '#1b1b1b',
  text: '#ffffff',
  textMuted: '#9ca3af',
};

const CHART_COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6'];

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

  // Datos simulados para gráficos
  const tareasData = [
    { name: 'Ene', entregadas: 8, pendientes: 3 },
    { name: 'Feb', entregadas: 12, pendientes: 2 },
    { name: 'Mar', entregadas: 10, pendientes: 4 },
    { name: 'Abr', entregadas: 14, pendientes: 1 },
  ];

  const metricsLabels = [
    { label: 'Total Asignaciones', key: 'totalAsignaciones', icon: '📋', color: COLORS.primary },
    { label: 'Grados Activos', key: 'gradosActivos', icon: '🎓', color: COLORS.secondary },
    { label: 'Materias Asignadas', key: 'materiasAsignadas', icon: '📚', color: COLORS.accent },
  ];

  const quickAccessLinks = [
    { label: 'Mis Tareas', icon: CheckCircleIcon, href: '/docente/tareas', description: 'Crear y gestionar tareas' },
    { label: 'Registrar Asistencia', icon: UserGroupIcon, href: '/docente/asistencia', description: 'Marcar asistencia diaria' },
    { label: 'Ver Horario', icon: CalendarIcon, href: '/docente/horarios', description: 'Consulta tu horario' },
    { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas', description: 'Gestiona calificaciones' },
  ];

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Docente" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>

        {/* User Info Section */}
        <div style={{
          backgroundColor: '#06b6d420',
          border: '1px solid #06b6d430',
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
            backgroundColor: '#06b6d4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.25rem',
            flexShrink: 0,
            border: '2px solid #06b6d440'
          }}>
            {user?.displayName?.charAt(0)?.toUpperCase() || '👨‍🏫'}
          </div>
          <div style={{flex: 1, minWidth: 0}}>
            <p style={{margin: 0, fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {user?.displayName || 'Usuario'}
            </p>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#06b6d4',
              color: '#ffffff',
              padding: '0.2rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '0.25rem'
            }}>
              👨‍🏫 Docente
            </div>
          </div>
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

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
            <span style={{ color: COLORS.textMuted, fontSize: '1.125rem' }}>Cargando datos...</span>
          </div>
        ) : (
          <>
            {/* Métricas mejoradas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {metricsLabels.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.surface} 0%, rgba(16, 185, 129, 0.05) 100%)`,
                    border: `1px solid rgba(16, 185, 129, 0.2)`,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = m.color;
                    e.currentTarget.style.boxShadow = `0 4px 12px rgba(16, 185, 129, 0.15)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = `rgba(16, 185, 129, 0.2)`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem', fontWeight: 500 }}>
                      {m.label}
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: m.color, fontSize: '2rem', fontWeight: 'bold' }}>
                      {resumen ? resumen[m.key as keyof typeof resumen] : '-'}
                    </p>
                  </div>
                  <span style={{ fontSize: '3rem' }}>{m.icon}</span>
                </div>
              ))}
            </div>

            {/* Gráficos */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  background: COLORS.surface,
                  border: `1px solid rgba(16, 185, 129, 0.1)`,
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                }}
              >
                <h2 style={{ margin: '0 0 1rem 0', color: COLORS.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Entregas de Tareas (Últimos Meses)
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tareasData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={`rgba(16, 185, 129, 0.1)`} />
                    <XAxis dataKey="name" stroke={COLORS.textMuted} />
                    <YAxis stroke={COLORS.textMuted} />
                    <Tooltip
                      contentStyle={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.primary}`, borderRadius: '0.5rem' }}
                      labelStyle={{ color: COLORS.text }}
                    />
                    <Legend />
                    <Bar dataKey="entregadas" fill={COLORS.success} name="Entregadas" />
                    <Bar dataKey="pendientes" fill={COLORS.accent} name="Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Accesos rápidos */}
            <div>
              <h2 style={{ margin: '0 0 1rem 0', color: COLORS.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                Accesos Rápidos
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {quickAccessLinks.map((link) => (
                  <NextLink
                    key={link.label}
                    href={link.href}
                    style={{
                      textDecoration: 'none',
                      background: COLORS.surface,
                      border: `1px solid rgba(16, 185, 129, 0.2)`,
                      padding: '1.5rem',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.transform = 'translateY(-4px)';
                      el.style.borderColor = COLORS.primary;
                      el.style.boxShadow = `0 4px 12px rgba(16, 185, 129, 0.15)`;
                      el.style.background = `linear-gradient(135deg, ${COLORS.surface} 0%, rgba(16, 185, 129, 0.05) 100%)`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.transform = 'none';
                      el.style.borderColor = `rgba(16, 185, 129, 0.2)`;
                      el.style.boxShadow = 'none';
                      el.style.background = COLORS.surface;
                    }}
                  >
                    <link.icon style={{ width: 32, height: 32, marginBottom: '0.75rem', color: COLORS.primary }} />
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600, color: COLORS.text }}>
                      {link.label}
                    </h3>
                    <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                      {link.description}
                    </p>
                  </NextLink>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
