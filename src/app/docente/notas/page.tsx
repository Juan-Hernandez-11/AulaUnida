'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { HomeIcon, CheckCircleIcon, UserGroupIcon, CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/admin-dashboard.module.css';
import NextLink from '@/components/NextLink';

// Colores
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

// Tipos
interface NotaDetalle {
  id: number;
  estudianteId: number;
  materiaId: number;
  periodoId: number;
  descripcion: string;
  valor: number;
  peso: number;
  fecha: string;
}

interface NotasResponse {
  notas: NotaDetalle[];
  promedioPonderado: number;
  totalPeso: number;
}

interface Estudiante {
  id: number;
  name: string;
  email: string;
}

interface Asignacion {
  gradoId: number;
  materiaId: number;
  cicloId: number;
  grado: { id: number; nombre: string; seccion: string };
  materia: { id: number; nombre: string };
  ciclo: { id: number; nombre: string };
}

interface Periodo {
  id: number;
  nombre: string;
}

export default function DocenteNotasPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Estados principales
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [selected, setSelected] = useState<Asignacion | null>(null);
  const [periodoId, setPeriodoId] = useState<number | null>(null);
  const [notasEstudiantes, setNotasEstudiantes] = useState<Record<number, NotasResponse>>({});
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);
  const [nuevaNota, setNuevaNota] = useState({ descripcion: '', valor: 3.0, peso: 10 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [docenteInfo, setDocenteInfo] = useState<any>(null);

  const fetchWithAuth = useCallback(async (url: string, options?: RequestInit) => {
    if (!user) throw new Error('Usuario no autenticado');
    const idToken = await user.getIdToken();
    return fetch(url, {
      ...options,
      headers: { ...options?.headers, Authorization: `Bearer ${idToken}` },
    });
  }, [user]);

  // Cargar asignaciones
  useEffect(() => {
    if (!user) return;
    
    (async () => {
      try {
        const res = await fetchWithAuth("/api/docente/asignaciones");
        const data = await res.json();
        setAsignaciones(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error cargando asignaciones:', error);
      }
    })();
  }, [user, fetchWithAuth]);

  // Cargar docente info
  useEffect(() => {
    if (!user) return;
    
    (async () => {
      try {
        const res = await fetchWithAuth('/api/docente/info');
        const data = await res.json();
        setDocenteInfo(data.docente);
      } catch (error) {
        console.error('Error cargando info:', error);
      }
    })();
  }, [user, fetchWithAuth]);

  // Cargar estudiantes y períodos
  useEffect(() => {
    if (!selected) {
      setEstudiantes([]);
      setPeriodos([]);
      return;
    }
    
    (async () => {
      setLoading(true);
      try {
        const [estudiantesRes, periodosRes] = await Promise.all([
          fetchWithAuth(`/api/docente/estudiantes?gradoId=${selected.gradoId}&materiaId=${selected.materiaId}`),
          fetchWithAuth(`/api/admin/periodos?cicloId=${selected.cicloId}`)
        ]);
        
        const [estData, perData] = await Promise.all([
          estudiantesRes.json(),
          periodosRes.json()
        ]);
        
        setEstudiantes(Array.isArray(estData) ? estData : []);
        setPeriodos(Array.isArray(perData) ? perData : []);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selected, fetchWithAuth]);

  // Cargar notas del período
  useEffect(() => {
    if (!selected || !periodoId) {
      setNotasEstudiantes({});
      return;
    }
    
    (async () => {
      setLoading(true);
      try {
        const notasObj: Record<number, NotasResponse> = {};
        
        for (const est of estudiantes) {
          try {
            const res = await fetchWithAuth(
              `/api/docente/notas/detalles?estudianteId=${est.id}&materiaId=${selected.materiaId}&periodoId=${periodoId}`
            );
            const data = await res.json();
            notasObj[est.id] = data;
          } catch (error) {
            notasObj[est.id] = { notas: [], promedioPonderado: 0, totalPeso: 0 };
          }
        }
        
        setNotasEstudiantes(notasObj);
      } catch (error) {
        console.error('Error cargando notas:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selected, periodoId, estudiantes, fetchWithAuth]);

  // Agregar nota
  const handleAgregarNota = async (estudianteId: number) => {
    if (!nuevaNota.descripcion || nuevaNota.valor < 0 || nuevaNota.valor > 5 || nuevaNota.peso <= 0) {
      setMsg("Verifica los datos");
      return;
    }
    
    if (!selected || !periodoId) return;
    
    setSaving(true);
    try {
      const idToken = await user!.getIdToken();
      const res = await fetch('/api/docente/notas/detalles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({
          estudianteId,
          materiaId: selected.materiaId,
          periodoId,
          descripcion: nuevaNota.descripcion,
          valor: nuevaNota.valor,
          peso: nuevaNota.peso
        })
      });
      
      if (res.ok) {
        setMsg("Nota agregada correctamente ✅");
        setNuevaNota({ descripcion: '', valor: 3.0, peso: 10 });
        setExpandedStudent(null);
        
        // Recargar notas
        const reloadRes = await fetchWithAuth(
          `/api/docente/notas/detalles?estudianteId=${estudianteId}&materiaId=${selected.materiaId}&periodoId=${periodoId}`
        );
        const data = await reloadRes.json();
        setNotasEstudiantes(prev => ({ ...prev, [estudianteId]: data }));
        
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Error al agregar nota ❌");
      }
    } catch (error) {
      setMsg("Error al agregar nota ❌");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Eliminar nota
  const handleEliminarNota = async (notaId: number, estudianteId: number) => {
    if (!confirm('¿Eliminar esta nota?')) return;
    
    setSaving(true);
    try {
      const idToken = await user!.getIdToken();
      const res = await fetch(`/api/docente/notas/detalles?notaId=${notaId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` }
      });
      
      if (res.ok) {
        setMsg("Nota eliminada correctamente ✅");
        
        // Actualizar state
        if (selected && periodoId) {
          const reloadRes = await fetchWithAuth(
            `/api/docente/notas/detalles?estudianteId=${estudianteId}&materiaId=${selected.materiaId}&periodoId=${periodoId}`
          );
          const data = await reloadRes.json();
          setNotasEstudiantes(prev => ({ ...prev, [estudianteId]: data }));
        }
        
        setTimeout(() => setMsg(""), 3000);
      } else {
        setMsg("Error al eliminar nota ❌");
      }
    } catch (error) {
      setMsg("Error al eliminar nota ❌");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = useCallback(async () => {
    router.push('/login');
  }, [router]);

  const sidebarLinks = [
    { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
    { label: 'Mis Tareas', icon: CheckCircleIcon, href: '/docente/tareas' },
    { label: 'Asistencia', icon: UserGroupIcon, href: '/docente/asistencia' },
    { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
    { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
  ];

  if (loading && selected && periodoId) {
    return (
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Docente" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
        </aside>
        <main className={styles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: COLORS.textMuted, fontSize: '1.125rem' }}>⏳ Cargando notas...</div>
        </main>
      </div>
    );
  }

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
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente/notas' ? styles.menuItemActive : ''}`}>
                  <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn} style={{ cursor: 'pointer' }}>
          <span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>📚 Asignación de Notas</h1>
        <p className={styles.subtitle}>
          {docenteInfo ? `Gestiona las notas de tus estudiantes, ${docenteInfo.name}` : 'Puedes agregar ilimitadas notas con pesos y porcentajes'}
        </p>

        <div className={styles.activityCard} style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.primary}20`, marginBottom: '2rem' }}>
          <h2 style={{ color: COLORS.text, marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
            📋 Seleccionar Grupo y Período
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: COLORS.text }}>
                Grupo y Materia:
              </label>
              <select
                value={selected ? `${selected.gradoId}-${selected.materiaId}` : ''}
                onChange={(e) => {
                  const [gradoId, materiaId] = e.target.value.split('-');
                  const a = asignaciones.find(x => x.gradoId === parseInt(gradoId) && x.materiaId === parseInt(materiaId));
                  setSelected(a || null);
                  setPeriodoId(null);
                }}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '0.5rem',
                  border: `1px solid ${COLORS.primary}40`,
                  background: COLORS.bg,
                  color: COLORS.text,
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                <option value="">Selecciona grupo y materia...</option>
                {asignaciones.map(a => (
                  <option key={`${a.gradoId}-${a.materiaId}`} value={`${a.gradoId}-${a.materiaId}`}>
                    {a.grado.nombre} {a.grado.seccion} - {a.materia.nombre}
                  </option>
                ))}
              </select>
            </div>

            {selected && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: COLORS.text }}>
                  Período:
                </label>
                <select
                  value={periodoId || ''}
                  onChange={(e) => setPeriodoId(e.target.value ? parseInt(e.target.value) : null)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '0.5rem',
                    border: `1px solid ${COLORS.secondary}40`,
                    background: COLORS.bg,
                    color: COLORS.text,
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Selecciona período...</option>
                  {periodos.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {msg && (
          <div style={{
            backgroundColor: msg.includes('Error') ? `${COLORS.danger}20` : `${COLORS.success}20`,
            border: `1px solid ${msg.includes('Error') ? COLORS.danger : COLORS.success}`,
            color: msg.includes('Error') ? COLORS.danger : COLORS.success,
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}>
            {msg}
          </div>
        )}

        {/* Estudiantes */}
        {selected && periodoId && !loading && estudiantes.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
            {estudiantes.map(est => {
              const notasData = notasEstudiantes[est.id] || { notas: [], promedioPonderado: 0, totalPeso: 0 };
              const isExpanded = expandedStudent === est.id;
              
              return (
                <div 
                  key={est.id} 
                  style={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.primary}20`,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease',
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
                  {/* Encabezado */}
                  <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: COLORS.text, fontSize: '1.1rem', fontWeight: 600 }}>
                    {est.name}
                  </h3>
                  <p style={{ color: COLORS.textMuted, margin: '0.5rem 0 1rem 0', fontSize: '0.9rem' }}>
                    📧 {est.email}
                  </p>

                  {/* Notas */}
                  {notasData.notas.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: COLORS.textMuted, margin: '0 0 0.5rem 0', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
                        Notas del Período:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {notasData.notas.map(nota => (
                          <div key={nota.id} style={{
                            backgroundColor: `${COLORS.secondary}20`,
                            border: `1px solid ${COLORS.secondary}40`,
                            borderRadius: '0.4rem',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.8rem',
                            color: COLORS.secondary,
                            fontWeight: 600
                          }}>
                            {nota.valor.toFixed(1)}/5 • {nota.peso}%
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Promedio */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: notasData.promedioPonderado > 0 ? `${COLORS.primary}15` : `${COLORS.textMuted}10`,
                    borderRadius: '0.5rem',
                    border: `1px solid ${notasData.promedioPonderado > 0 ? COLORS.primary : COLORS.textMuted}20`,
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: COLORS.textMuted }}>Promedio Ponderado</p>
                    <p style={{
                      margin: 0,
                      color: notasData.promedioPonderado >= 3.0 ? COLORS.primary : notasData.promedioPonderado > 0 ? COLORS.accent : COLORS.textMuted,
                      fontWeight: 700,
                      fontSize: '1.5rem'
                    }}>
                      {notasData.promedioPonderado > 0 ? notasData.promedioPonderado.toFixed(2) : '--'}
                    </p>
                  </div>

                  {/* Botón expandir */}
                  {notasData.notas.length > 0 && (
                    <button
                      onClick={() => setExpandedStudent(isExpanded ? null : est.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: COLORS.secondary,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        textDecoration: 'underline'
                      }}
                    >
                      {isExpanded ? '▼ Contraer' : '▶ Ver detalles'}
                    </button>
                  )}

                  {/* Detalles expandidos */}
                  {isExpanded && notasData.notas.length > 0 && (
                    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `1px solid ${COLORS.primary}20` }}>
                      <h4 style={{ color: COLORS.text, margin: '0 0 0.75rem', fontSize: '0.95rem' }}>Listado detallado:</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {notasData.notas.map(nota => (
                          <div
                            key={nota.id}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.75rem',
                              backgroundColor: `${COLORS.surface}80`,
                              borderRadius: '0.4rem',
                              border: `1px solid ${COLORS.primary}20`,
                              fontSize: '0.85rem'
                            }}
                          >
                            <div>
                              <div style={{ color: COLORS.text, fontWeight: 600 }}>
                                {nota.descripcion}
                              </div>
                              <div style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>
                                {nota.valor.toFixed(1)}/5.0 • Peso: {nota.peso}%
                              </div>
                            </div>
                            <button
                              onClick={() => handleEliminarNota(nota.id, est.id)}
                              disabled={saving}
                              style={{
                                padding: '0.4rem 0.8rem',
                                backgroundColor: `${COLORS.danger}20`,
                                color: COLORS.danger,
                                border: `1px solid ${COLORS.danger}40`,
                                borderRadius: '0.4rem',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Agregar nota */}
                  {isExpanded || notasData.notas.length === 0 ? (
                    <div style={{ borderTop: `1px solid ${COLORS.primary}20`, paddingTop: '1rem' }}>
                      <h4 style={{ color: COLORS.text, margin: '0 0 0.75rem', fontSize: '0.95rem' }}>
                        + Agregar Nueva Nota
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <input
                          type="text"
                          placeholder="Descripción (Quiz, Evaluación, etc)"
                          value={nuevaNota.descripcion}
                          onChange={(e) => setNuevaNota({ ...nuevaNota, descripcion: e.target.value })}
                          style={{
                            padding: '0.6rem',
                            borderRadius: '0.4rem',
                            border: `1px solid ${COLORS.primary}40`,
                            background: COLORS.bg,
                            color: COLORS.text,
                            fontSize: '0.9rem',
                            gridColumn: '1 / -1'
                          }}
                        />
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="Nota (0-5)"
                          value={nuevaNota.valor}
                          onChange={(e) => setNuevaNota({ ...nuevaNota, valor: parseFloat(e.target.value) || 0 })}
                          style={{
                            padding: '0.6rem',
                            borderRadius: '0.4rem',
                            border: `1px solid ${COLORS.primary}40`,
                            background: COLORS.bg,
                            color: COLORS.text,
                            fontSize: '0.9rem'
                          }}
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Peso %"
                          value={nuevaNota.peso}
                          onChange={(e) => setNuevaNota({ ...nuevaNota, peso: parseFloat(e.target.value) || 0 })}
                          style={{
                            padding: '0.6rem',
                            borderRadius: '0.4rem',
                            border: `1px solid ${COLORS.primary}40`,
                            background: COLORS.bg,
                            color: COLORS.text,
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleAgregarNota(est.id)}
                        disabled={saving}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          backgroundColor: COLORS.primary,
                          color: COLORS.bg,
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontWeight: 600,
                          cursor: saving ? 'not-allowed' : 'pointer',
                          opacity: saving ? 0.6 : 1,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!saving) e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {saving ? '⏳ Agregando...' : '➕ Agregar Nota'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setExpandedStudent(est.id)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: `${COLORS.primary}20`,
                        color: COLORS.primary,
                        border: `1px solid ${COLORS.primary}40`,
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${COLORS.primary}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${COLORS.primary}20`;
                      }}
                    >
                      + Agregar Nota
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && selected && periodoId && estudiantes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: `${COLORS.accent}10`,
            border: `2px dashed ${COLORS.accent}`,
            borderRadius: '0.75rem',
            color: COLORS.textMuted
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <h3 style={{ color: COLORS.accent, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Sin estudiantes</h3>
            <p>No hay estudiantes en este grupo</p>
          </div>
        )}

        {!selected && !periodoId && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: `${COLORS.secondary}10`,
            border: `2px dashed ${COLORS.secondary}`,
            borderRadius: '0.75rem',
            color: COLORS.textMuted
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ color: COLORS.secondary, marginBottom: '0.5rem', fontSize: '1.2rem' }}>Selecciona un grupo</h3>
            <p>Elige un grupo y periodo para comenzar a asignar notas</p>
          </div>
        )}
      </main>
    </div>
  );
}
