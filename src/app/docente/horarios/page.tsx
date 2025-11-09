"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import { CalendarIcon, BookOpenIcon, HomeIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';
import styles from '../../../styles/admin-dashboard.module.css';

interface HorarioItem {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  materia: {
    nombre: string;
  } | null;
  grado: {
    nombre: string;
    seccion: string;
  } | null;
  aula: {
    codigo: string;
    nombre: string;
  } | null;
}

const sidebarLinks = [
  { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
  { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
  { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
];

export default function DocenteHorariosPage() {
  const [horarios, setHorarios] = useState<HorarioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [docenteInfo, setDocenteInfo] = useState<any>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      try {
        const idToken = await user.getIdToken();
        
        // Cargar horarios
        const horariosResponse = await fetch('/api/docente/horarios', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        
        if (horariosResponse.ok) {
          const horariosData = await horariosResponse.json();
          console.log('✅ Horarios recibidos:', horariosData);
          setHorarios(horariosData);
        } else {
          console.error('❌ Error en respuesta de horarios:', horariosResponse.status);
          const errorData = await horariosResponse.text();
          console.error('Error details:', errorData);
        }

        // Cargar info del docente
        const infoResponse = await fetch('/api/docente/info', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          setDocenteInfo(infoData.docente);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);



  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Docente" className={styles.avatar} width={32} height={32} />
          <span className={styles.logo}>AulaUnida</span>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarLinks.map((link, idx) => (
              <li key={link.label}>
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente/horarios' ? styles.menuItemActive : ''}`}>
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
        <h1 className={styles.title}>Mi Horario de Clases</h1>
        {docenteInfo ? (
          <p className={styles.subtitle}>Horarios asignados para {docenteInfo.name}</p>
        ) : (
          <p className={styles.subtitle}>Consulta tu horario de clases semanal</p>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}>
            <span style={{ color: '#B0B3B8', fontSize: '1.125rem' }}>Cargando horarios...</span>
          </div>
        ) : horarios.length === 0 ? (
          <div className={styles.activityCard}>
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <CalendarIcon style={{ width: 64, height: 64, margin: '0 auto 1rem', color: '#9CA3AF' }} />
              <h3 style={{ color: '#F1F5F9', marginBottom: '0.5rem' }}>No hay horarios asignados</h3>
              <p style={{ color: '#64748B' }}>
                Contacta al administrador para que te asigne un horario de clases.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Horario Semanal</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {horarios.map((horario) => (
                <div 
                  key={horario.id}
                  className={styles.card}
                  style={{ padding: '1.5rem' }}
                >
                  <h4 style={{ margin: '0 0 1rem 0', color: '#22c55e', fontSize: '1.25rem', fontWeight: 600 }}>
                    {horario.materia?.nombre || 'Materia no asignada'}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', color: '#CBD5E1' }}>
                    <p style={{ margin: 0 }}>
                      <strong>Grado:</strong> {horario.grado ? `${horario.grado.nombre} ${horario.grado.seccion}` : 'No asignado'}
                    </p>
                    <p style={{ margin: 0 }}><strong>Día:</strong> {horario.dia}</p>
                    <p style={{ margin: 0 }}><strong>Hora:</strong> {horario.horaInicio} - {horario.horaFin}</p>
                    <p style={{ margin: 0 }}>
                      <strong>Aula:</strong> {horario.aula?.codigo || 'Sin aula asignada'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}