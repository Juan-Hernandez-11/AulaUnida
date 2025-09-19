"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/authContext';
import { UserCircleIcon, BookOpenIcon, CalendarIcon, UsersIcon, ClipboardIcon, AcademicCapIcon, ChartBarIcon, MegaphoneIcon, Cog6ToothIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import NextLink from '../../components/NextLink';
import { useEffect, useState } from 'react';
import styles from '../../styles/admin-dashboard.module.css';

const metricsLabels = [
  { label: 'Usuarios Activos', key: 'usuariosActivos' },
  { label: 'Grados Registrados', key: 'gradosRegistrados' },
  { label: 'Anuncios Recientes', key: 'anunciosRecientes' },
];

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UsersIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Asignaturas', icon: BookOpenIcon, href: '/admin/asignaturas' },
  { label: 'Horarios', icon: CalendarIcon, href: '/admin/horarios' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
  { label: 'Ciclos Lectivos', icon: CalendarIcon, href: '/admin/ciclos' },
  { label: 'Reportes', icon: ChartBarIcon, href: '/admin/reportes' },
  { label: 'Anuncios', icon: MegaphoneIcon, href: '/admin/anuncios' },
  { label: 'Configuración', icon: Cog6ToothIcon, href: '/admin/configuracion' },
  { label: 'Ayuda/FAQs', icon: QuestionMarkCircleIcon, href: '/admin/faqs' },
];

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setActivity(data.actividad || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
  <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map((link, idx) => (
                <li key={link.label}>
                  <NextLink href={link.href} className={styles.menuItem}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
          <button onClick={logout} className={styles.logoutBtn}><span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión</button>
        </aside>

        {/* Main content */}
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Panel de Administrador</h1>
          <p className={styles.subtitle}>Bienvenido, aquí tienes un resumen del estado del sistema.</p>

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
                    <span className={styles.metricValue}>{metrics ? metrics[m.key] : '-'}</span>
                  </div>
                ))}
              </div>

              {/* Actividad reciente */}
              <div className={styles.activityCard}>
                <h2 className={styles.activityTitle}>Actividad Reciente</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table className={styles.activityTable}>
                    <thead>
                      <tr>
                        <th>USUARIO</th>
                        <th>ACCIÓN</th>
                        <th>FECHA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.length === 0 ? (
                        <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin actividad reciente</td></tr>
                      ) : (
                        activity.map((a, idx) => (
                          <tr key={idx}>
                            <td className={styles.activityUser}>{a.user}</td>
                            <td className={styles.activityAction}>{a.action}</td>
                            <td className={styles.activityDate}>{a.date}</td>
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
