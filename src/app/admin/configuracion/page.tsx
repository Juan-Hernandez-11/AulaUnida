"use client";
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import NextLink from '../../../components/NextLink';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Configuración', icon: Cog6ToothIcon, href: '/admin/configuracion', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

function BackToDashboardButton() {
  return (
    <div style={{ marginBottom: 24 }}>
  <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 500 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}


export default function AdminConfiguracionPage() {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${link.active ? styles.menuItemActive : ''}`}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <h1 className={styles.title}>Configuración General</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Opciones de Configuración</h2>
            <ul style={{ marginLeft: 24, marginTop: 12, color: '#B0B3B8', fontSize: '1.1rem' }}>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Cambiar contraseña (próximamente)</button></li>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Configurar correo institucional (próximamente)</button></li>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Parámetros del sistema (próximamente)</button></li>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Gestión de backups (próximamente)</button></li>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Notificaciones (próximamente)</button></li>
              <li><button style={{ background: '#232527', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', marginBottom: 8, cursor: 'pointer' }} disabled>Integraciones externas (próximamente)</button></li>
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
