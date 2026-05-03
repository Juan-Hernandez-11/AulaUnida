'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HomeIcon, CheckCircleIcon, UserGroupIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
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

interface Estudiante {
  id: number;
  name: string;
  email: string;
  presente?: boolean;
}

export default function DocenteAsistenciaPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [materias, setMaterias] = useState<any[]>([]);
  const [grados, setGrados] = useState<any[]>([]);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedGrado, setSelectedGrado] = useState('');
  const [selectedFecha, setSelectedFecha] = useState(new Date().toISOString().split('T')[0]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [registros, setRegistros] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) return;
    loadMaterias();
  }, [user]);

  const loadMaterias = async () => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch('/api/docente/asignaciones', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        const materiasUnicas = Array.isArray(data) ? data : [];
        setMaterias(materiasUnicas);
      }
    } catch (err) {
      console.error('Error cargando materias:', err);
    }
  };

  const handleMateriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const materiaId = e.target.value;
    setSelectedMateria(materiaId);
    setSelectedGrado('');
    setEstudiantes([]);
    setRegistros({});
    
    // Obtener grados disponibles para la materia seleccionada
    if (materiaId) {
      const materiaSeleccionada = materias.find(m => m.materiaId === parseInt(materiaId));
      if (materiaSeleccionada) {
        // Obtener grados únicos de esa materia (puede haber múltiples docentes asignados)
        const gradosUnicos = materias
          .filter(m => m.materiaId === parseInt(materiaId))
          .map(m => m.grado)
          .filter((grado, index, self) => index === self.findIndex(g => g.id === grado.id));
        setGrados(gradosUnicos);
      }
    } else {
      setGrados([]);
    }
  };

  const loadAsistencia = async () => {
    if (!selectedMateria || !selectedGrado) {
      setError('Selecciona materia y grado');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const idToken = await user?.getIdToken();
      
      const response = await fetch(
        `/api/docente/asistencia?materiaId=${selectedMateria}&gradoId=${selectedGrado}&fecha=${selectedFecha}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEstudiantes(data.estudiantes || []);
        
        // Pre-llenar con asistencias existentes
        const registrosMap: { [key: number]: boolean } = {};
        if (data.asistencias) {
          data.asistencias.forEach((a: any) => {
            registrosMap[a.estudianteId] = a.presente;
          });
        }
        setRegistros(registrosMap);
      }
    } catch (err) {
      console.error('Error cargando asistencia:', err);
      setError('Error al cargar asistencia');
    } finally {
      setLoading(false);
    }
  };

  const handlePresencia = (estudianteId: number, presente: boolean) => {
    setRegistros(prev => ({
      ...prev,
      [estudianteId]: presente,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMateria || !selectedGrado) {
      setError('Selecciona materia y grado');
      return;
    }

    try {
      setLoading(true);
      const idToken = await user?.getIdToken();
      
      const registrosArray = Object.entries(registros).map(([estudianteId, presente]) => ({
        estudianteId: parseInt(estudianteId),
        presente,
      }));

      const response = await fetch('/api/docente/asistencia', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materiaId: parseInt(selectedMateria),
          gradoId: parseInt(selectedGrado),
          fecha: selectedFecha,
          registros: registrosArray,
        }),
      });

      if (response.ok) {
        setSuccess('Asistencia registrada correctamente');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Error al guardar asistencia');
      }
    } catch (err) {
      console.error('Error guardando asistencia:', err);
      setError('Error al guardar asistencia');
    } finally {
      setLoading(false);
    }
  };

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

        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarLinks.map((link) => (
              <li key={link.label}>
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente/asistencia' ? styles.menuItemActive : ''}`}>
                  <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={() => {}} className={styles.logoutBtn}>
          <span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>📋 Registro de Asistencia</h1>
        <p className={styles.subtitle}>Marca la asistencia de tus estudiantes</p>

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
        
        {success && (
          <div style={{
            backgroundColor: `${COLORS.success}20`,
            border: `1px solid ${COLORS.success}`,
            color: COLORS.success,
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✅</span> {success}
          </div>
        )}

        <div className={styles.activityCard} style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.primary}20` }}>
          <h2 className={styles.activityTitle} style={{ color: COLORS.text }}>Seleccionar Materia, Fecha y Grado</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Materia *
                </label>
                <select 
                  value={selectedMateria}
                  onChange={handleMateriaChange}
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
                  {materias.map((m) => (
                    <option key={m.id} value={m.materiaId}>{m.materia.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Fecha *
                </label>
                <input 
                  type="date"
                  value={selectedFecha}
                  onChange={(e) => setSelectedFecha(e.target.value)}
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

              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                  Grado/Sección *
                </label>
                <select 
                  value={selectedGrado}
                  onChange={(e) => setSelectedGrado(e.target.value)}
                  disabled={!selectedMateria || grados.length === 0}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '0.5rem',
                    border: `1px solid ${COLORS.secondary}40`,
                    background: COLORS.bg,
                    color: COLORS.text,
                    fontSize: '1rem',
                    cursor: selectedMateria && grados.length > 0 ? 'pointer' : 'not-allowed',
                    opacity: selectedMateria && grados.length > 0 ? 1 : 0.5
                  }}
                >
                  <option value="">Selecciona un grado...</option>
                  {grados.map((g) => (
                    <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                type="button"
                onClick={loadAsistencia}
                disabled={loading || !selectedMateria || !selectedGrado}
                style={{
                  padding: '12px 24px',
                  backgroundColor: COLORS.secondary,
                  color: COLORS.bg,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: loading || !selectedMateria || !selectedGrado ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  opacity: loading || !selectedMateria || !selectedGrado ? 0.5 : 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading && selectedMateria && selectedGrado) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {loading ? '⏳ Cargando...' : '📥 Cargar Clase'}
              </button>
            </div>
          </form>
        </div>

        {estudiantes.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: `2px solid ${COLORS.primary}40`
            }}>
              <h2 style={{ color: COLORS.text, fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                👥 Marcar Asistencia
              </h2>
              <div style={{ color: COLORS.textMuted, fontSize: '0.9rem', fontWeight: 500 }}>
                <span style={{ color: COLORS.primary }}>●</span> {estudiantes.length} estudiantes
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.primary}20`,
                borderRadius: '0.75rem',
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1rem',
                  padding: '1rem 1.5rem',
                  backgroundColor: `${COLORS.surface}80`,
                  borderBottom: `1px solid ${COLORS.primary}20`,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <div>📝 Estudiante</div>
                  <div style={{ textAlign: 'center' }}>✅ Presente</div>
                  <div style={{ textAlign: 'center' }}>❌ Ausente</div>
                </div>

                {/* Rows */}
                <div>
                  {estudiantes.map((est, idx) => (
                    <div
                      key={est.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr',
                        gap: '1rem',
                        padding: '1.25rem 1.5rem',
                        borderBottom: `1px solid ${COLORS.primary}15`,
                        backgroundColor: idx % 2 === 0 ? COLORS.surface : `${COLORS.primary}05`,
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${COLORS.primary}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = idx % 2 === 0 ? COLORS.surface : `${COLORS.primary}05`;
                      }}
                    >
                      <div>
                        <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: '0.25rem' }}>
                          {est.name}
                        </div>
                        <div style={{ color: COLORS.textMuted, fontSize: '0.85rem' }}>
                          {est.email}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: registros[est.id] === true ? `${COLORS.success}20` : 'transparent',
                          border: registros[est.id] === true ? `2px solid ${COLORS.success}` : `2px solid transparent`,
                        }}>
                          <input 
                            type="radio"
                            name={`asistencia-${est.id}`}
                            checked={registros[est.id] === true}
                            onChange={() => handlePresencia(est.id, true)}
                            style={{ cursor: 'pointer', width: '20px', height: '20px', accentColor: COLORS.success }}
                          />
                        </label>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: registros[est.id] === false ? `${COLORS.danger}20` : 'transparent',
                          border: registros[est.id] === false ? `2px solid ${COLORS.danger}` : `2px solid transparent`,
                        }}>
                          <input 
                            type="radio"
                            name={`asistencia-${est.id}`}
                            checked={registros[est.id] === false}
                            onChange={() => handlePresencia(est.id, false)}
                            style={{ cursor: 'pointer', width: '20px', height: '20px', accentColor: COLORS.danger }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'flex-end',
                marginTop: '1.5rem'
              }}>
                <button 
                  type="button"
                  onClick={() => {
                    setEstudiantes([]);
                    setRegistros({});
                  }}
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
                  disabled={loading}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: COLORS.primary,
                    color: COLORS.bg,
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = `0 8px 16px ${COLORS.primary}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {loading ? '⏳ Guardando...' : '💾 Guardar Asistencia'}
                </button>
              </div>
            </form>
          </div>
        )}

        {estudiantes.length === 0 && selectedMateria && selectedGrado && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: `${COLORS.accent}10`,
            border: `2px dashed ${COLORS.accent}`,
            borderRadius: '0.75rem',
            color: COLORS.textMuted,
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ color: COLORS.accent, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Sin estudiantes</h3>
            <p>No hay estudiantes en esta clase o no hay registros disponibles.</p>
          </div>
        )}
      </main>
    </div>
  );
}
