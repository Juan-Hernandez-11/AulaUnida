"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/authContext';
import { UserCircleIcon, BookOpenIcon, CalendarIcon, UsersIcon, ClipboardIcon, AcademicCapIcon, ChartBarIcon, MegaphoneIcon, Cog6ToothIcon, QuestionMarkCircleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import NextLink from '../../components/NextLink';
import Button from '../../components/ui/Button';
import TriangleIcon from '../../components/icons/TriangleIcon';
import { useEffect, useState } from 'react';
import LoadingModal from '../../components/ui/LoadingModal';
import useDelayedOpen from '../../hooks/useDelayedOpen';
import styles from '../../styles/admin-dashboard.module.css';
import adminIndexStyles from '../../styles/admin-index.module.css';

const metricsLabels = [
  { label: 'Usuarios Activos', key: 'usuariosActivos' },
  { label: 'Grados Registrados', key: 'gradosRegistrados' },
  // { label: 'Anuncios Recientes', key: 'anunciosRecientes' },
];

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UsersIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Asignaturas', icon: BookOpenIcon, href: '/admin/asignaturas' },
  { label: 'Sedes', icon: BuildingOfficeIcon, href: '/admin/sedes' },
  { label: 'Horarios', icon: CalendarIcon, href: '/admin/horarios' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
  { label: 'Ciclos Lectivos', icon: CalendarIcon, href: '/admin/ciclos' },
  { label: 'Reportes', icon: ChartBarIcon, href: '/admin/reportes' },
  // { label: 'Anuncios', icon: MegaphoneIcon, href: '/admin/anuncios' },
  { label: 'Configuración', icon: Cog6ToothIcon, href: '/admin/configuracion' },
  // { label: 'Ayuda/FAQs', icon: QuestionMarkCircleIcon, href: '/admin/faqs' },
    { label: 'Crear Usuario', icon: UserCircleIcon, href: '/admin/usuarios' },
    { label: 'Listado de usuarios', icon: UserCircleIcon, href: '/admin/usuarios/listado' },
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

  const delayedOpen = useDelayedOpen(loading);

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
  <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={adminIndexStyles.brand}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
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

          {/* Loader y datos reales */}
          {loading ? (
            <LoadingModal open={delayedOpen} message="Cargando datos..." />
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
                <div className={adminIndexStyles.tableOverflow}>
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
                        <tr><td colSpan={3} className={adminIndexStyles.emptyRow}>Sin actividad reciente</td></tr>
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
