"use client";
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import NextLink from '../../../components/NextLink';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  // { label: 'Anuncios', icon: MegaphoneIcon, href: '/admin/anuncios', active: true },
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


export default function AdminAnunciosPage() {
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
                  <NextLink href={link.href} className={styles.menuItem}>
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
          <h1 className={styles.title}>Gestión de Anuncios Generales</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Crear/Editar Anuncio</h2>
            <form style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <input className="border p-2 rounded flex-1" placeholder="Título del anuncio" disabled />
              <textarea className="border p-2 rounded flex-1" placeholder="Contenido" disabled />
              <button className="bg-blue-500 text-white rounded p-2" disabled>Publicar</button>
            </form>
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Anuncios</h2>
            <table className={styles.activityTable}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.activityUser}>(sin datos)</td>
                  <td className={styles.activityAction}>(sin datos)</td>
                  <td className={styles.activityAction}>(sin datos)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
