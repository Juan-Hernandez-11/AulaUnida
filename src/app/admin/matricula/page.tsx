"use client";

import { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

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

type Grado = { id: number; nombre: string; seccion: string };
type Estudiante = { id: number; name: string; email: string };

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula', active: true },
];

export default function AdminMatriculaPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [matriculados, setMatriculados] = useState<Estudiante[]>([]);
  const [gradoId, setGradoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ gradoId?: string; estudianteId?: string }>({});
  const [selectedEstudiante, setSelectedEstudiante] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Cargar grados y estudiantes al montar
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/grados').then(r => r.json()),
      fetch('/api/admin/usuarios').then(r => r.json()),
    ]).then(([grados, usuarios]) => {
      setGrados(grados);
      setEstudiantes(usuarios.filter((u: any) => u.role === 'STUDENT' || u.role === 'estudiante'));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Cargar estudiantes matriculados al seleccionar grado o refrescar
  const fetchMatriculados = () => {
    if (!gradoId) return;
    setLoading(true);
    fetch(`/api/admin/matricula?gradoId=${gradoId}`)
      .then(r => r.json())
      .then(data => {
        setMatriculados(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(() => { setLoading(false); setRefreshing(false); });
  };
  useEffect(() => { fetchMatriculados(); }, [gradoId]);

  const handleGradoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setGradoId(value);
    setMatriculados([]);
    setError('');
    setFieldErrors(prev => ({ ...prev, gradoId: !value ? 'Debes seleccionar un grado.' : '' }));
  };

  const handleEstudianteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedEstudiante(value);
    setFieldErrors(prev => ({ ...prev, estudianteId: !value ? 'Debes seleccionar un estudiante.' : '' }));
  };

  const handleMatricular = async (estudianteId: number) => {
    if (!gradoId) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/matricula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gradoId: Number(gradoId), estudianteId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al matricular');
      } else {
        const nuevo = await res.json();
        setMatriculados(prev => [...prev, nuevo]);
        setSuccess('Estudiante matriculado correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEliminar = async (estudianteId: number) => {
    if (!gradoId) return;
    if (!window.confirm('¿Seguro que deseas eliminar la matrícula?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/matricula', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gradoId: Number(gradoId), estudianteId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar matrícula');
      } else {
        setMatriculados(prev => prev.filter(e => e.id !== estudianteId));
        setSuccess('Matrícula eliminada correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <Image src="/favicon.ico" alt="AulaUnida Admin" className={styles.avatar} width={32} height={32} />
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
          <h1 className={styles.title}>Gestión de Matrícula</h1>
          <div className={styles.activityCard}>
            {/* Instrucción */}
            <div style={{ marginBottom: 18, color: '#b0b3b8', fontSize: 16 }}>
              Selecciona un grado para ver y gestionar sus estudiantes matriculados. Puedes agregar o eliminar estudiantes según corresponda.
            </div>
            {/* Selector de grado */}
            <h2 style={{ fontWeight: 600, color: '#22c55e', marginBottom: 8 }}>Selecciona un grado</h2>
            {grados.length === 0 ? (
              <div style={{ color: '#f87171', marginBottom: 16 }}>No hay grados registrados.</div>
            ) : (
              <select
                value={gradoId}
                onChange={handleGradoChange}
                style={{
                  background: '#181A1B',
                  color: '#fff',
                  border: '1.5px solid #232527',
                  borderRadius: 6,
                  padding: '10px 14px',
                  fontSize: 16,
                  outline: 'none',
                  boxShadow: 'none',
                  marginBottom: 16,
                  width: '100%',
                  transition: 'border 0.2s',
                }}
                onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
              >
                <option value="">Selecciona grado</option>
                {grados.map(g => (
                  <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>
                ))}
              </select>
            )}
            {/* Datos del grado seleccionado */}
            {gradoId && (
              <>
                <div style={{ marginBottom: 12, padding: '8px 16px', background: '#232734', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 24 }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>Grado:</span>
                  <span style={{ color: '#22c55e', fontWeight: 500 }}>{grados.find(g => String(g.id) === gradoId)?.nombre} {grados.find(g => String(g.id) === gradoId)?.seccion}</span>
                  <span style={{ color: '#b0b3b8', fontWeight: 400 }}>Matriculados: <b>{matriculados.length}</b></span>
                  <button
                    style={{ marginLeft: 'auto', background: 'var(--color-primary)', color: '#fff', borderRadius: 6, padding: '6px 16px', fontWeight: 500, border: 'none', cursor: refreshing ? 'not-allowed' : 'pointer' }}
                    onClick={() => { setRefreshing(true); fetchMatriculados(); }}
                    disabled={refreshing}
                  >
                    {refreshing ? 'Actualizando...' : 'Refrescar'}
                  </button>
                </div>
                {/* Separador visual */}
                <hr style={{ border: 'none', borderTop: '1px solid #232527', margin: '16px 0' }} />
                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Estudiantes matriculados</h3>
                {loading ? (
                  <div style={{ color: '#888' }}>Cargando...</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                      <thead style={{ background: '#232734' }}>
                        <tr>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Nombre</th>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Email</th>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matriculados.length === 0 ? (
                          <tr><td colSpan={3} style={{ padding: 24, textAlign: 'center', color: '#888' }}>Sin estudiantes matriculados</td></tr>
                        ) : (
                          matriculados.map((e, idx) => (
                            <tr key={e.id} style={{ borderTop: '1px solid #232527', background: idx % 2 === 0 ? '#181A1B' : '#232734' }}>
                              <td style={{ padding: 8 }}>{e.name}</td>
                              <td style={{ padding: 8 }}>{e.email}</td>
                              <td style={{ padding: 8 }}>
                                <button style={{ color: '#dc2626', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => handleEliminar(e.id)}>Eliminar</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Separador visual */}
                <hr style={{ border: 'none', borderTop: '1px solid #232527', margin: '16px 0' }} />
                <h3 style={{ fontWeight: 600, marginTop: 8, marginBottom: 8 }}>Agregar estudiante</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <select
                      id="add-estudiante"
                      value={selectedEstudiante}
                      onChange={handleEstudianteChange}
                      style={{
                        background: '#181A1B',
                        color: '#fff',
                        border: '1.5px solid #232527',
                        borderRadius: 6,
                        padding: '10px 14px',
                        fontSize: 16,
                        outline: 'none',
                        boxShadow: 'none',
                        marginRight: 8,
                        width: '100%',
                        transition: 'border 0.2s',
                      }}
                      onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                      onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                    >
                      <option value="">Selecciona estudiante</option>
                      {estudiantes.filter(e => !matriculados.some(m => m.id === e.id)).map(e => (
                        <option key={e.id} value={e.id}>{e.name} ({e.email})</option>
                      ))}
                    </select>
                    {fieldErrors.estudianteId && <span style={{ color: 'red', fontSize: 12 }}>{fieldErrors.estudianteId}</span>}
                  </div>
                  <button
                    style={{
                      background: loading ? '#22c55e99' : '#22c55e',
                      color: '#fff',
                      borderRadius: 6,
                      padding: '10px 24px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      minWidth: 120,
                      fontSize: 16,
                      boxShadow: 'none',
                      transition: 'background 0.2s',
                    }}
                    onClick={() => {
                      if (!selectedEstudiante) {
                        setFieldErrors(prev => ({ ...prev, estudianteId: 'Debes seleccionar un estudiante.' }));
                        return;
                      }
                      handleMatricular(Number(selectedEstudiante));
                      setSelectedEstudiante('');
                    }}
                    disabled={loading || !selectedEstudiante || !!fieldErrors.estudianteId}
                  >
                    Matricular
                  </button>
                </div>
              </>
            )}
            {fieldErrors.gradoId && <div style={{ color: 'red', marginTop: 12 }}>{fieldErrors.gradoId}</div>}
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
            {loading && <div style={{ color: '#888', marginBottom: 12 }}>Procesando...</div>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
