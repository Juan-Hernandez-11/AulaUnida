"use client";
import styles from '../../styles/admin-dashboard.module.css';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';
import TriangleIcon from '../../components/icons/TriangleIcon';

export default function DocenteDashboard() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="/profile-placeholder.png" alt="Docente" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="/docente/notas" className={`${styles.menuItem} ${styles.menuItemActive}`}>Notas</a>
            </li>
          </ul>
        </nav>
        <div style={{marginTop:'2.5rem'}}>
          <Button variant="ghost" onClick={handleLogout}><TriangleIcon /> Cerrar sesión</Button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Panel de Control del Docente</h1>
        <p className={styles.subtitle}>Bienvenido, aquí puedes gestionar las notas de tus estudiantes.</p>
        {/* Aquí puedes agregar secciones como Resumen de Clases, Notificaciones, Accesos Rápidos, etc. */}
      </main>
    </div>
  );
}
