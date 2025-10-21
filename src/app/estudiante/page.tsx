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
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <img src="/default-avatar.png" alt="avatar" className={styles.avatar} />
          <div>
            <div className={styles.name}>{user.displayName || user.email}</div>
            <div className={styles.role}>Estudiante</div>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/estudiante" className={styles.navItem + ' ' + styles.active}>Inicio</Link>
          <Link href="/estudiante/asignaturas" className={styles.navItem}>Asignaturas</Link>
          <Link href="/estudiante/notas" className={styles.navItem}>Notas y Asistencia</Link>
          <Link href="/estudiante/boletin" className={styles.navItem}>Boletín</Link>
          {/* Anuncios eliminados según solicitud del usuario */}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.headerTitle}>Panel de Estudiante</h1>
              <p className={styles.subtitle}>Bienvenida de nuevo, {user.displayName?.split(' ')[0] || 'estudiante'}.</p>
            </div>
            <div className={styles.headerActions}>
              <Button variant="ghost" onClick={async () => { await logout(); router.push('/login'); }}>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </header>

        <section className={styles.contentRow}>
          <div className={styles.leftCol}>
            <div className={styles.card}>
              <h3>Mis Asignaturas</h3>
              <div className={styles.taskList}>
                {/* global modal for data loading shown below */}
                {!loadingData && asignaturas.length === 0 && <div>No hay asignaturas disponibles</div>}
                {!loadingData && asignaturas.map((a, i) => (
                  <div key={i} className={styles.taskItem}>
                    <div className={styles.taskIcon}>�</div>
                    <div style={{flex:1}}>
                      <div className={styles.taskTitle}>{a}</div>
                    </div>
                    <div style={{color:'#666'}}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card} style={{marginTop: 18}}>
              <h3>Próximas Clases</h3>
              <div className={styles.classList}>
                {/* loading modal covers data loads */}
                {!loadingData && horario.length === 0 && <div>No hay clases próximamente</div>}
                {!loadingData && horario.map((h, i) => (
                  <div key={i} className={styles.classItem}>
                    <div>
                      <div className={styles.classTitle}>{h.materia}</div>
                      <div className={styles.classSub}>{h.aula}</div>
                    </div>
                    <div className={styles.classTime}>{h.hora}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className={styles.rightCol}>
            <div className={styles.cardCol}>
              <h3>Resumen de Notas</h3>
              <div className={styles.notis}>
                {/* loading modal covers data loads */}
                {!loadingData && notas.length === 0 && <div>No hay notas para mostrar</div>}
                {!loadingData && notas.length > 0 && (
                  <div>
                    {/* Agrupar por materia y calcular promedio */}
                    {Object.entries(notas.reduce((acc: any, cur: any) => {
                      const nombre = cur.materia?.nombre || 'Sin materia';
                      if (!acc[nombre]) acc[nombre] = { suma: 0, cantidad: 0 };
                      acc[nombre].suma += cur.valor || 0;
                      acc[nombre].cantidad += 1;
                      return acc;
                    }, {})).map(([mat, val]: any, i) => (
                      <div key={i} className={styles.notiItem} style={{padding: '8px 0'}}>
                        <div>
                          <div className={styles.notiTitle}>{mat}</div>
                          <div className={styles.notiSub}>Promedio: {(val.suma / val.cantidad).toFixed(2)} ({val.cantidad} notas)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{marginTop: 12}}>
                <BoletinPDF cicloId={cicloId} />
              </div>
              {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
            </div>
          </aside>
        </section>
        {/* centralized loading modal for data fetches */}
        <LoadingModal open={delayedDataOpen} message="Cargando datos..." />
      </main>
    </div>
  );
}