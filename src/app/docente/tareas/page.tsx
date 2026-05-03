'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, HomeIcon, CheckCircleIcon, UserGroupIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/admin-dashboard.module.css';
import NextLink from '@/components/NextLink';

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

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materiaId: number;
  materia: { id: number; nombre: string };
  fechaEntrega: string | null;
  entregas: Array<{
    id: number;
    estudianteId: number;
    estado: string;
    entregadaAt: string;
  }>;
  entrega: any;
  entregada: boolean;
}

export default function DocenteTareasPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    materiaId: '',
    titulo: '',
    descripcion: '',
    fechaEntrega: '',
    horaEntrega: '23:59',
  });
  const [materias, setMaterias] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    loadTareas();
    loadMaterias();
  }, [user]);

  const loadTareas = async () => {
    try {
      setLoading(true);
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/docente/tareas', {
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

  const loadMaterias = async () => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/docente/asignaciones', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMaterias(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Error cargando materias:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.materiaId || !formData.titulo) {
      setError('Completa todos los campos requeridos');
      return;
    }

    try {
      const idToken = await user?.getIdToken();
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `/api/docente/tareas?tareaId=${editingId}`
        : '/api/docente/tareas';

      const response = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          materiaId: parseInt(formData.materiaId),
          tareaId: editingId,
        }),
      });

      if (response.ok) {
        setFormData({ materiaId: '', titulo: '', descripcion: '', fechaEntrega: '', horaEntrega: '23:59' });
        setEditingId(null);
        setShowForm(false);
        setError('');
        // Pequeño delay para asegurar que el backend procesó la tarea
        await new Promise(resolve => setTimeout(resolve, 500));
        await loadTareas();
      } else {
        setError('Error al guardar tarea');
      }
    } catch (err) {
      console.error('Error guardando tarea:', err);
      setError('Error al guardar tarea');
    }
  };

  const handleDelete = async (tareaId: number) => {
    if (!confirm('¿Eliminar esta tarea?')) return;

    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`/api/docente/tareas?tareaId=${tareaId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await loadTareas();
      } else {
        setError('Error al eliminar tarea');
      }
    } catch (err) {
      console.error('Error eliminando tarea:', err);
      setError('Error al eliminar tarea');
    }
  };

  const handleEdit = (tarea: Tarea) => {
    let horaEntrega = '23:59';
    let fechaEntrega = '';
    
    if (tarea.fechaEntrega) {
      const fecha = new Date(tarea.fechaEntrega);
      fechaEntrega = tarea.fechaEntrega.split('T')[0];
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      horaEntrega = `${horas}:${minutos}`;
    }
    
    setFormData({
      materiaId: String(tarea.materiaId),
      titulo: tarea.titulo,
      descripcion: tarea.descripcion || '',
      fechaEntrega,
      horaEntrega,
    });
    setEditingId(tarea.id);
    setShowForm(true);
  };

  if (loading) return (
    <div className={styles.dashboardContainer}>
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
      </aside>
      <main className={styles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: COLORS.textMuted, fontSize: '1.125rem' }}>⏳ Cargando tareas...</div>
      </main>
    </div>
  );

  const sidebarLinks = [
    { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
    { label: 'Mis Tareas', icon: CheckCircleIcon, href: '/docente/tareas' },
    { label: 'Asistencia', icon: UserGroupIcon, href: '/docente/asistencia' },
    { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
    { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
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
          background: 'linear-gradient(135deg, #06b6d415 0%, #06b6d408 100%)',
          border: '1px solid #06b6d440',
          borderRadius: '0.75rem',
          padding: '1rem',
          marginBottom: '2rem',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 4px 12px rgba(6, 182, 212, 0.08)'
        }}>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.7rem', color: '#06b6d4', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.8px' }}>👤 Rol Activo</p>
          <div style={{ backgroundColor: '#06b6d408', borderLeft: '3px solid #06b6d4', paddingLeft: '0.75rem', paddingTop: '0.5rem', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            <p style={{ margin: '0', fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.3px' }}>👨‍🏫 Docente</p>
          </div>
          <div style={{ borderTop: '1px solid #06b6d420', paddingTop: '0.75rem', marginTop: '0' }}>
            <p style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ✦ {user?.displayName || 'Usuario'}
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.email}
            </p>
          </div>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente/tareas' ? styles.menuItemActive : ''}`}>
                  <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => {}} className={styles.logoutBtn} style={{ cursor: 'pointer' }}>
          <span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className={styles.title}>📝 Mis Tareas</h1>
            <p className={styles.subtitle}>Crea y gestiona tareas para tus estudiantes</p>
          </div>
          <button 
            onClick={() => {
              setFormData({ materiaId: '', titulo: '', descripcion: '', fechaEntrega: '', horaEntrega: '23:59' });
              setEditingId(null);
              setShowForm(!showForm);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '12px 24px',
              backgroundColor: COLORS.primary,
              color: COLORS.bg,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
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
            <PlusIcon style={{ width: 24, height: 24 }} />
            Nueva Tarea
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
            fontWeight: 500
          }}>
            ❌ {error}
          </div>
        )}

        {showForm && (
          <div style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.primary}20`,
            padding: '2rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: COLORS.text, marginTop: 0, marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: 600 }}>
              {editingId ? '✏️ Actualizar Tarea' : '✨ Crear Nueva Tarea'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Materia *
                </label>
                <select 
                  value={formData.materiaId}
                  onChange={(e) => setFormData({ ...formData, materiaId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '0.5rem',
                    border: `1px solid ${COLORS.primary}40`,
                    background: COLORS.bg,
                    color: COLORS.text,
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Selecciona una materia...</option>
                  {materias.map(m => (
                    <option key={m.id} value={m.materiaId}>{m.materia.nombre} ({m.grado.nombre} {m.grado.seccion})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Título *
                </label>
                <input 
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  placeholder="Ej: Trabajo práctico 1"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '0.5rem',
                    border: `1px solid ${COLORS.primary}40`,
                    background: COLORS.bg,
                    color: COLORS.text,
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Descripción
                </label>
                <textarea 
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Detalles de la tarea..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '0.5rem',
                    border: `1px solid ${COLORS.primary}40`,
                    background: COLORS.bg,
                    color: COLORS.text,
                    fontSize: '1rem',
                    minHeight: '100px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Fecha y Hora de Entrega
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                  <input 
                    type="date"
                    value={formData.fechaEntrega}
                    onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value })}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '0.5rem',
                      border: `1px solid ${COLORS.primary}40`,
                      background: COLORS.bg,
                      color: COLORS.text,
                      fontSize: '1rem'
                    }}
                  />
                  <input 
                    type="time"
                    value={formData.horaEntrega}
                    onChange={(e) => setFormData({ ...formData, horaEntrega: e.target.value })}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '0.5rem',
                      border: `1px solid ${COLORS.primary}40`,
                      background: COLORS.bg,
                      color: COLORS.text,
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="submit" 
                  style={{
                    padding: '12px 24px',
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {editingId ? '✅ Actualizar' : '➕ Crear'} Tarea
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ materiaId: '', titulo: '', descripcion: '', fechaEntrega: '', horaEntrega: '23:59' });
                  }}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: COLORS.textMuted,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {tareas.map(tarea => (
            <div 
              key={tarea.id} 
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.primary}20`,
                padding: '1.5rem',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = `${COLORS.primary}20`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: COLORS.text, fontSize: '1.1rem', fontWeight: 600 }}>
                {tarea.titulo}
              </h3>
              <p style={{ color: COLORS.textMuted, margin: '0.5rem 0', fontSize: '0.9rem' }}>
                📚 <strong>{tarea.materia?.nombre}</strong>
              </p>
              {tarea.descripcion && (
                <p style={{ color: COLORS.textMuted, margin: '0.5rem 0', fontSize: '0.9rem' }}>
                  {tarea.descripcion}
                </p>
              )}
              {tarea.fechaEntrega && (
                <p style={{ color: COLORS.accent, margin: '0.5rem 0', fontSize: '0.9rem', fontWeight: 600 }}>
                  📅 Entrega: {new Date(tarea.fechaEntrega).toLocaleDateString('es-ES')}
                </p>
              )}
              <p style={{ color: COLORS.secondary, margin: '0.75rem 0 1rem 0', fontSize: '0.9rem', fontWeight: 600 }}>
                📊 Entregas: <span style={{ color: COLORS.primary }}>{tarea.entregas?.length || 0}</span>
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <NextLink 
                  href={`/docente/tareas/${tarea.id}`} 
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: COLORS.secondary,
                    color: COLORS.bg,
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Ver Entregas
                </NextLink>
                <button 
                  onClick={() => handleEdit(tarea)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: COLORS.accent,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <PencilIcon style={{ width: 18, height: 18, color: COLORS.bg }} />
                </button>
                <button 
                  onClick={() => handleDelete(tarea.id)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: COLORS.danger,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <TrashIcon style={{ width: 18, height: 18, color: COLORS.text }} />
                </button>
              </div>
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
            <p>No hay tareas creadas aún. ¡Crea una para tus estudiantes!</p>
          </div>
        )}
      </main>
    </div>
  );
}
