'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { uploadFileToStorage } from '@/lib/uploadFile';
import styles from '@/styles/admin-dashboard.module.css';

// Paleta de colores
const COLORS = {
  primary: '#10b981',
  secondary: '#06b6d4',
  accent: '#f59e0b',
  danger: '#ef4444',
  success: '#10b981',
  pending: '#06b6d4',
  bg: '#0f0f0f',
  surface: '#1b1b1b',
  text: '#ffffff',
  textMuted: '#9ca3af',
};

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: { nombre: string };
  fechaEntrega: string | null;
  entregada: boolean;
  calificada: boolean;
  entrega?: {
    id: number;
    estado: string;
    calificacion?: {
      valor: number;
      retroalimentacion: string;
    };
  };
}

export default function EstudianteTareasPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null);
  const [formData, setFormData] = useState({ texto: '', archivo: null as File | null });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadTareas();
  }, [user]);

  const loadTareas = async () => {
    try {
      setLoading(true);
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/estudiante/tareas', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTareas(data.tareas || []);
      } else {
        setError('Error al cargar tareas');
      }
    } catch (err) {
      console.error('Error cargando tareas:', err);
      setError('Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  };

  const handleEntregarTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTarea || !formData.texto) return;

    try {
      setSubmitting(true);
      let archivoUrl = '';

      // Si hay archivo, subirlo a Firebase Storage
      if (formData.archivo) {
        archivoUrl = await uploadFileToStorage(formData.archivo, `entregas/${selectedTarea.id}`);
      }

      const idToken = await user?.getIdToken();
      const response = await fetch('/api/estudiante/tareas', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tareaId: selectedTarea.id,
          texto: formData.texto,
          archivoUrl: archivoUrl || '',
        }),
      });

      if (response.ok) {
        loadTareas();
        setSelectedTarea(null);
        setFormData({ texto: '', archivo: null });
      } else {
        setError('Error al entregar tarea');
      }
    } catch (err) {
      console.error('Error entregando tarea:', err);
      setError(err instanceof Error ? err.message : 'Error al entregar tarea');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="/favicon.ico" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>

        {/* User Info Section */}
        <div style={{
          background: 'linear-gradient(135deg, #10b98115 0%, #10b98108 100%)',
          border: '1px solid #10b98140',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '2rem',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)'
        }}>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.7rem', color: '#10b981', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.8px' }}>👤 Rol Activo</p>
          <div style={{ backgroundColor: '#10b98108', borderLeft: '3px solid #10b981', paddingLeft: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.3px' }}>🎓 Estudiante</p>
          </div>
          <div style={{ borderTop: '1px solid #10b98120', paddingTop: '0.75rem', marginTop: '0' }}>
            <p style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.8rem', color: '#10b981', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ✓ {user?.displayName || 'Usuario'}
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email}
            </p>
          </div>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="/estudiante" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Inicio
              </a>
            </li>
            <li>
              <a href="/estudiante/tareas" className={`${styles.menuItem} ${styles.menuItemActive}`} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Mis Tareas
              </a>
            </li>
            <li>
              <a href="/estudiante/asignaturas" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Asignaturas
              </a>
            </li>
            <li>
              <a href="/estudiante/notas" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H16L22 8V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Notas
              </a>
            </li>
            <li>
              <a href="/estudiante/asistencia" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Asistencia
              </a>
            </li>
            <li>
              <a href="/estudiante/boletin" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Boletín
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: COLORS.textMuted, fontSize: '1.125rem' }}>⏳ Cargando tareas...</div>
      </main>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <img src="/favicon.ico" className={styles.avatar} />
          <span className={styles.logo}>AulaUnida</span>
        </div>

        {/* User Profile Section - AdminLTE Style */}
        <div style={{
          backgroundColor: '#10b98120',
          border: '1px solid #10b98130',
          borderRadius: '0.75rem',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#10b98130';
          e.currentTarget.style.borderColor = '#10b981';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#10b98120';
          e.currentTarget.style.borderColor = '#10b98130';
        }}
        >
          {/* Avatar */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffffff',
            flexShrink: 0,
            border: '2px solid #10b98140'
          }}>
            {user?.displayName?.charAt(0)?.toUpperCase() || '🎓'}
          </div>
          
          {/* User Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {user?.displayName || 'Estudiante'}
            </p>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#10b981',
              color: '#0f0f0f',
              padding: '0.2rem 0.5rem',
              borderRadius: '0.35rem',
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              🎓 Estudiante
            </div>
          </div>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="/estudiante" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Inicio
              </a>
            </li>
            <li>
              <a href="/estudiante/tareas" className={`${styles.menuItem} ${styles.menuItemActive}`} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Mis Tareas
              </a>
            </li>
            <li>
              <a href="/estudiante/asignaturas" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Asignaturas
              </a>
            </li>
            <li>
              <a href="/estudiante/notas" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4V10C16 10.5304 16.2107 11.0391 16.5858 11.4142C16.9609 11.7893 17.4696 12 18 12H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H16L22 8V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Notas y Asistencia
              </a>
            </li>
            <li>
              <a href="/estudiante/boletin" className={styles.menuItem} style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit'}}>
                <span style={{ marginRight: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Boletín
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className={styles.title}>📋 Mis Tareas</h1>
            <p className={styles.subtitle}>Consulta y entrega tus tareas asignadas</p>
          </div>
          <button
            onClick={() => router.push('/estudiante')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: `${COLORS.secondary}20`,
              border: `1px solid ${COLORS.secondary}`,
              color: COLORS.secondary,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${COLORS.secondary}30`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${COLORS.secondary}20`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>←</span> Volver
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: `${COLORS.danger}20`,
            border: `1px solid ${COLORS.danger}`,
            color: COLORS.danger,
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>❌</span> {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {tareas.map(tarea => (
            <div 
              key={tarea.id}
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${tarea.calificada ? COLORS.success : tarea.entregada ? COLORS.pending : COLORS.danger}20`,
                borderLeft: `4px solid ${tarea.calificada ? COLORS.success : tarea.entregada ? COLORS.pending : COLORS.danger}`,
                padding: '1.5rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: COLORS.text, fontSize: '1.1rem', fontWeight: 600, flex: 1 }}>
                  {tarea.titulo}
                </h3>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: tarea.calificada ? `${COLORS.success}20` : tarea.entregada ? `${COLORS.pending}20` : `${COLORS.danger}20`,
                  color: tarea.calificada ? COLORS.success : tarea.entregada ? COLORS.pending : COLORS.danger,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {tarea.calificada ? '✅ Calificada' : tarea.entregada ? '📤 Entregada' : '⏳ Pendiente'}
                </span>
              </div>

              <p style={{ color: COLORS.textMuted, margin: '0.5rem 0', fontSize: '0.9rem' }}>
                📚 <strong>{tarea.materia?.nombre}</strong>
              </p>

              {tarea.descripcion && (
                <p style={{ color: COLORS.textMuted, margin: '0.75rem 0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {tarea.descripcion}
                </p>
              )}

              {tarea.fechaEntrega && (
                <p style={{
                  color: COLORS.accent,
                  margin: '0.75rem 0',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <ClockIcon style={{ width: 16, height: 16 }} />
                  Entrega: {new Date(tarea.fechaEntrega).toLocaleDateString('es-ES')}
                </p>
              )}

              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: `${COLORS.surface}80`,
                borderRadius: '0.5rem',
                border: `1px solid ${COLORS.primary}15`
              }}>
                {tarea.calificada ? (
                  <>
                    <p style={{ margin: '0 0 0.5rem 0', color: COLORS.success, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircleIcon style={{ width: 18, height: 18 }} /> Calificada
                    </p>
                    <p style={{ margin: '0.25rem 0', color: COLORS.text, fontWeight: 600, fontSize: '1.2rem' }}>
                      {tarea.entrega?.calificacion?.valor}/100
                    </p>
                    {tarea.entrega?.calificacion?.retroalimentacion && (
                      <p style={{ margin: '0.75rem 0 0 0', color: COLORS.textMuted, fontSize: '0.85rem', lineHeight: '1.4' }}>
                        <strong>💬 Retroalimentación:</strong><br />
                        {tarea.entrega.calificacion.retroalimentacion}
                      </p>
                    )}
                  </>
                ) : tarea.entregada ? (
                  <p style={{ margin: 0, color: COLORS.pending, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📤 <span>Entregada (espera calificación)</span>
                  </p>
                ) : (
                  <p style={{ margin: 0, color: COLORS.danger, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⏳ <span>No entregada</span>
                  </p>
                )}
              </div>

              {!tarea.entregada && (
                <button
                  onClick={() => {
                    setSelectedTarea(tarea);
                    setFormData({ texto: '', archivo: null });
                  }}
                  style={{
                    width: '100%',
                    marginTop: '1rem',
                    padding: '12px',
                    backgroundColor: COLORS.primary,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.primary}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  📤 Entregar Tarea
                </button>
              )}
            </div>
          ))}
        </div>

        {tareas.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: `${COLORS.accent}10`,
            border: `2px dashed ${COLORS.accent}`,
            borderRadius: '0.75rem',
            color: COLORS.textMuted
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ color: COLORS.accent, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Sin tareas</h3>
            <p>No hay tareas asignadas aún. Vuelve pronto para ver nuevas tareas.</p>
          </div>
        )}
      </main>

      {/* Modal para entregar tarea */}
      {selectedTarea && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.primary}20`,
            padding: '2rem',
            borderRadius: '0.75rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginTop: 0, color: COLORS.text, marginBottom: '1.5rem' }}>
              📤 Entregar: {selectedTarea.titulo}
            </h2>
            
            <form onSubmit={handleEntregarTarea}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Mensaje o Descripción *
                </label>
                <textarea
                  value={formData.texto}
                  onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                  placeholder="Escribe aquí tu respuesta o describe tu trabajo..."
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '12px',
                    border: `1px solid ${COLORS.primary}40`,
                    borderRadius: '0.5rem',
                    fontFamily: 'inherit',
                    background: COLORS.bg,
                    color: COLORS.text,
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  📎 Archivo (opcional)
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '12px',
                  border: `2px dashed ${COLORS.primary}40`,
                  borderRadius: '0.5rem',
                  background: `${COLORS.bg}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, archivo: e.target.files[0] });
                      }
                    }}
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.zip"
                  />
                  <span style={{ flex: 1, textAlign: 'center', color: formData.archivo ? COLORS.success : COLORS.textMuted }}>
                    {formData.archivo 
                      ? `✓ ${formData.archivo.name}` 
                      : '📤 Haz clic o arrastra un archivo'}
                  </span>
                </div>
                <small style={{ color: COLORS.textMuted, display: 'block', marginTop: '0.5rem' }}>
                  Formatos permitidos: PDF, Word, Excel, PowerPoint, Texto, Imágenes, ZIP
                </small>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSelectedTarea(null)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: COLORS.textMuted,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.texto}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: COLORS.primary,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: submitting || !formData.texto ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem',
                    opacity: submitting || !formData.texto ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting && formData.texto) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.primary}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {submitting ? '⏳ Entregando...' : '✅ Entregar Tarea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}