"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/authContext';
import { UserCircleIcon, BookOpenIcon, CalendarIcon, UsersIcon, ClipboardIcon, AcademicCapIcon, ChartBarIcon, MegaphoneIcon, Cog6ToothIcon, QuestionMarkCircleIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import NextLink from '../../components/NextLink';
import Button from '../../components/ui/Button';
import TriangleIcon from '../../components/icons/TriangleIcon';
import { useEffect, useState } from 'react';
import LoadingModal from '../../components/ui/LoadingModal';
import useDelayedOpen from '../../hooks/useDelayedOpen';
import styles from '../../styles/admin-dashboard.module.css';
import adminIndexStyles from '../../styles/admin-index.module.css';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const metricsLabels = [
  { label: 'Total Usuarios', key: 'totalUsuarios', icon: '👥' },
  { label: 'Estudiantes', key: 'totalEstudiantes', icon: '🎓' },
  { label: 'Docentes', key: 'totalDocentes', icon: '📚' },
  { label: 'Grados', key: 'totalGrados', icon: '📋' },
];

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UsersIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Asignaturas', icon: BookOpenIcon, href: '/admin/asignaturas' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion' },
  { label: 'Sedes', icon: BuildingOfficeIcon, href: '/admin/sedes' },
  { label: 'Horarios', icon: CalendarIcon, href: '/admin/horarios' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
  { label: 'Ciclos Lectivos', icon: CalendarIcon, href: '/admin/ciclos' },
  { label: 'Reportes', icon: ChartBarIcon, href: '/admin/reportes' },
  { label: 'Anuncios', icon: MegaphoneIcon, href: '/admin/anuncios' },
  { label: 'Configuración', icon: Cog6ToothIcon, href: '/admin/configuracion' },
  { label: 'Crear Usuario', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Listado de usuarios', icon: UserCircleIcon, href: '/admin/usuarios/listado' },
];

// Paleta de colores acorde de AulaUnida
const COLORS = {
  primary: '#10b981',    // Verde esmeralda
  secondary: '#06b6d4',  // Cyan
  accent: '#f59e0b',     // Amber
  danger: '#ef4444',     // Red
  success: '#10b981',    // Verde
  bg: '#0f0f0f',         // Negro
  surface: '#1b1b1b',    // Gris oscuro
  text: '#ffffff',       // Blanco
  textMuted: '#9ca3af',  // Gris
};

const CHART_COLORS = ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await fetch('/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setMetrics(data);
          setActivity(data.actividad || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [user]);

  const delayedOpen = useDelayedOpen(loading);

  // Preparar datos para gráfico de distribución de usuarios
  const usuariosData = metrics ? [
    { name: 'Estudiantes', value: metrics.totalEstudiantes || 0 },
    { name: 'Docentes', value: metrics.totalDocentes || 0 },
    { name: 'Admins', value: metrics.totalAdmins || 0 },
  ] : [];

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={adminIndexStyles.brand}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>

          {/* User Info Section */}
          <div style={{
            backgroundColor: '#f59e0b20',
            border: '1px solid #f59e0b30',
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
              backgroundColor: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.25rem',
              flexShrink: 0,
              border: '2px solid #f59e0b40'
            }}>
              {user?.displayName?.charAt(0)?.toUpperCase() || '⚙️'}
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <p style={{margin: 0, fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                {user?.displayName || 'Usuario'}
              </p>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#f59e0b',
                color: '#ffffff',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginTop: '0.25rem'
              }}>
                ⚙️ Administrador
              </div>
            </div>
          </div>

          <nav className={styles.menu}>
            <ul className={adminIndexStyles.menuList}>
              {sidebarLinks.map((link, idx) => (
                <li key={link.label}>
                  <NextLink href={link.href} className={styles.menuItem}>
                    <link.icon className={adminIndexStyles.linkIcon} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="ghost" onClick={logout}><TriangleIcon /> Cerrar sesión</Button>
        </aside>

        {/* Main content */}
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Panel de Administrador</h1>
          <p className={styles.subtitle}>Bienvenido, aquí tienes un resumen del estado del sistema.</p>

          {loading ? (
            <LoadingModal open={delayedOpen} message="Cargando datos..." />
          ) : (
            <>
              {/* Métricas mejoradas */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
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
                      e.currentTarget.style.borderColor = COLORS.primary;
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
                      <p style={{ margin: '0.5rem 0 0 0', color: COLORS.primary, fontSize: '2rem', fontWeight: 'bold' }}>
                        {metrics ? metrics[m.key] : '-'}
                      </p>
                    </div>
                    <span style={{ fontSize: '3rem' }}>{m.icon}</span>
                  </div>
                ))}
              </div>

              {/* Gráficos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Gráfico de distribución de usuarios */}
                <div
                  style={{
                    background: COLORS.surface,
                    border: `1px solid rgba(16, 185, 129, 0.1)`,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                  }}
                >
                  <h2 style={{ margin: '0 0 1rem 0', color: COLORS.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Distribución de Usuarios
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={usuariosData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill={COLORS.primary}
                        dataKey="value"
                      >
                        {usuariosData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.primary}`, borderRadius: '0.5rem' }}
                        labelStyle={{ color: COLORS.text }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Estadísticas resumidas */}
                <div
                  style={{
                    background: COLORS.surface,
                    border: `1px solid rgba(16, 185, 129, 0.1)`,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                >
                  <h2 style={{ margin: '0 0 1rem 0', color: COLORS.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Estadísticas Rápidas
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { label: 'Total Materias', value: metrics?.totalMaterias || 0, icon: '📖' },
                      { label: 'Total Sedes', value: metrics?.totalSedes || 0, icon: '🏫' },
                    ].map((stat, idx) => (
                      <div
                        key={stat.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          background: `rgba(16, 185, 129, 0.05)`,
                          borderLeft: `3px solid ${CHART_COLORS[idx % CHART_COLORS.length]}`,
                          borderRadius: '0.5rem',
                        }}
                      >
                        <span style={{ color: COLORS.textMuted, fontSize: '0.9rem' }}>
                          {stat.icon} {stat.label}
                        </span>
                        <span style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: '1.25rem' }}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actividad reciente */}
              <div
                style={{
                  background: COLORS.surface,
                  border: `1px solid rgba(16, 185, 129, 0.1)`,
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                }}
              >
                <h2 style={{ margin: '0 0 1rem 0', color: COLORS.text, fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Actividad Reciente
                </h2>
                <div className={adminIndexStyles.tableOverflow}>
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.9rem',
                    }}
                  >
                    <thead>
                      <tr style={{ borderBottom: `1px solid rgba(16, 185, 129, 0.2)` }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: COLORS.primary, fontWeight: 'bold' }}>USUARIO</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: COLORS.primary, fontWeight: 'bold' }}>ACCIÓN</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', color: COLORS.primary, fontWeight: 'bold' }}>FECHA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.length === 0 ? (
                        <tr>
                          <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: COLORS.textMuted }}>
                            Sin actividad reciente
                          </td>
                        </tr>
                      ) : (
                        activity.map((a, idx) => (
                          <tr key={idx} style={{ borderBottom: `1px solid rgba(16, 185, 129, 0.1)` }}>
                            <td style={{ padding: '0.75rem', color: COLORS.text }}>{a.user}</td>
                            <td style={{ padding: '0.75rem', color: COLORS.secondary }}>{a.action}</td>
                            <td style={{ padding: '0.75rem', color: COLORS.textMuted }}>{a.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
