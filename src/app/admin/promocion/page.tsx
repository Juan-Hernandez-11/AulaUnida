"use client";

import { useEffect, useState, ChangeEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, UserGroupIcon } from '@heroicons/react/24/outline';
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

type Ciclo = { id: number; nombre: string };
type Grado = { nombre: string; secciones: string[] };
type Estudiante = {
  estudianteId: number;
  nombre: string;
  documento: string;
  gradoActual: { id: number; nombre: string; seccion: string };
  promedioGeneral: number;
  maxGradoAlcanzadoId: number | null;
};

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminPromocionPage() {
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [anios, setAnios] = useState<string[]>([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState('');
  const [grados, setGrados] = useState<Grado[]>([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState('');
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(false);
  const [procesandoId, setProcesandoId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Cargar ciclos y extraer años únicos al montar
  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/ciclos')
      .then(r => r.json())
      .then(data => {
        const ciclosArray = Array.isArray(data) ? data : [];
        setCiclos(ciclosArray);
        
        // Extraer años únicos (ej: "2026" de "2026A", "2026B")
        const aniosUnicos = [...new Set(ciclosArray.map(c => c.nombre.substring(0, 4)))].sort().reverse();
        setAnios(aniosUnicos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Cargar grados cuando se selecciona año
  const fetchGrados = (anio: string) => {
    if (!anio) {
      setGrados([]);
      setGradoSeleccionado('');
      setSeccionSeleccionada('');
      return;
    }
    fetch(`/api/admin/promocion/grados?anio=${anio}`)
      .then(r => r.json())
      .then(data => {
        setGrados(data.grados || []);
        setGradoSeleccionado('');
        setSeccionSeleccionada('');
      })
      .catch(err => console.error(err));
  };

  // Cargar estudiantes cuando se selecciona año (y opcionalmente grado/sección)
  const fetchEstudiantes = (anio: string, grado?: string, seccion?: string) => {
    if (!anio) return;
    setLoading(true);
    let url = `/api/admin/promocion?anio=${anio}`;
    if (grado) url += `&grado=${grado}`;
    if (seccion) url += `&seccion=${seccion}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setEstudiantes(Array.isArray(data) ? data : []);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setRefreshing(false);
      });
  };

  // Cuando cambia el año
  const handleAnioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nuevoAnio = e.target.value;
    setAnioSeleccionado(nuevoAnio);
    setEstudiantes([]);
    setError('');
    fetchGrados(nuevoAnio);
    if (nuevoAnio) {
      fetchEstudiantes(nuevoAnio);
    }
  };

  // Cuando cambia el grado
  const handleGradoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nuevoGrado = e.target.value;
    setGradoSeleccionado(nuevoGrado);
    setSeccionSeleccionada('');
    setError('');
    if (anioSeleccionado) {
      fetchEstudiantes(anioSeleccionado, nuevoGrado, '');
    }
  };

  // Cuando cambia la sección
  const handleSeccionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nuevaSeccion = e.target.value;
    setSeccionSeleccionada(nuevaSeccion);
    setError('');
    if (anioSeleccionado && gradoSeleccionado) {
      fetchEstudiantes(anioSeleccionado, gradoSeleccionado, nuevaSeccion);
    }
  };

  const handlePromocionar = async (estudianteId: number, accion: 'paso' | 'perdio') => {
    setProcesandoId(estudianteId);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/promocion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estudianteId, accion }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al procesar promoción');
      } else {
        const result = await res.json();
        setSuccess(result.mensaje);
        // Recargar estudiantes con los filtros actuales
        setTimeout(() => fetchEstudiantes(anioSeleccionado, gradoSeleccionado, seccionSeleccionada), 1000);
      }
    } catch (err) {
      setError('Error de red');
      console.error(err);
    } finally {
      setProcesandoId(null);
    }
  };

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
                  <NextLink href={link.href} className={`${styles.menuItem}`}>
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
          <h1 className={styles.title}>Promoción de Estudiantes</h1>
          <div className={styles.activityCard}>
            {/* Instrucción */}
            <div style={{ marginBottom: 18, color: '#b0b3b8', fontSize: 16 }}>
              Selecciona un año para ver todos los estudiantes del año completo y promocionarlos al siguiente grado o retenerlos.
            </div>

            {/* Selector de año */}
            <h2 style={{ fontWeight: 600, color: '#22c55e', marginBottom: 8 }}>Selecciona un año</h2>
            {anios.length === 0 ? (
              <div style={{ color: '#f87171', marginBottom: 16 }}>No hay años registrados.</div>
            ) : (
              <select
                value={anioSeleccionado}
                onChange={handleAnioChange}
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
                <option value="">Selecciona año</option>
                {anios.map(anio => (
                  <option key={anio} value={anio}>{anio}</option>
                ))}
              </select>
            )}

            {/* Datos del año seleccionado */}
            {anioSeleccionado && (
              <>
                <div style={{ marginBottom: 12, padding: '8px 16px', background: '#232734', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 24 }}>
                  <span style={{ fontWeight: 600, color: '#fff' }}>Año:</span>
                  <span style={{ color: '#22c55e', fontWeight: 500 }}>{anioSeleccionado}</span>
                  <span style={{ color: '#b0b3b8', fontWeight: 400 }}>Estudiantes: <b>{estudiantes.length}</b></span>
                  <button
                    style={{ marginLeft: 'auto', background: 'var(--color-primary)', color: '#fff', borderRadius: 6, padding: '6px 16px', fontWeight: 500, border: 'none', cursor: refreshing ? 'not-allowed' : 'pointer' }}
                    onClick={() => { setRefreshing(true); fetchEstudiantes(anioSeleccionado, gradoSeleccionado, seccionSeleccionada); }}
                    disabled={refreshing}
                  >
                    {refreshing ? 'Actualizando...' : 'Refrescar'}
                  </button>
                </div>

                {/* Selectores de grado y sección */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  {/* Selector de grado */}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, color: '#22c55e', marginBottom: 8 }}>Grado (Opcional)</label>
                    <select
                      value={gradoSeleccionado}
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
                        width: '100%',
                        transition: 'border 0.2s',
                        cursor: 'pointer'
                      }}
                      onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                      onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                    >
                      <option value="">Todos los grados</option>
                      {grados.map(grado => (
                        <option key={grado.nombre} value={grado.nombre}>{grado.nombre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de sección */}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, color: '#22c55e', marginBottom: 8 }}>Grupo (Opcional)</label>
                    <select
                      value={seccionSeleccionada}
                      onChange={handleSeccionChange}
                      disabled={!gradoSeleccionado}
                      style={{
                        background: !gradoSeleccionado ? '#1a1a1a' : '#181A1B',
                        color: '#fff',
                        border: '1.5px solid #232527',
                        borderRadius: 6,
                        padding: '10px 14px',
                        fontSize: 16,
                        outline: 'none',
                        boxShadow: 'none',
                        width: '100%',
                        transition: 'border 0.2s',
                        cursor: !gradoSeleccionado ? 'not-allowed' : 'pointer',
                        opacity: !gradoSeleccionado ? 0.5 : 1
                      }}
                      onFocus={e => !gradoSeleccionado || (e.currentTarget.style.border = '1.5px solid #22c55e')}
                      onBlur={e => !gradoSeleccionado || (e.currentTarget.style.border = '1.5px solid #232527')}
                    >
                      <option value="">Todos los grupos</option>
                      {gradoSeleccionado && grados.find(g => g.nombre === gradoSeleccionado)?.secciones.map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Separador visual */}
                <hr style={{ border: 'none', borderTop: '1px solid #232527', margin: '16px 0' }} />

                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Estudiantes para promocionar</h3>
                {loading ? (
                  <div style={{ color: '#888' }}>Cargando estudiantes...</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
                      <thead style={{ background: '#232734' }}>
                        <tr>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Nombre</th>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Documento</th>
                          <th style={{ padding: 8, textAlign: 'left', fontWeight: 600 }}>Grado Actual</th>
                          <th style={{ padding: 8, textAlign: 'center', fontWeight: 600 }}>Promedio</th>
                          <th style={{ padding: 8, textAlign: 'center', fontWeight: 600 }}>Decisión</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estudiantes.length === 0 ? (
                          <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#888' }}>Sin estudiantes en este año</td></tr>
                        ) : (
                          estudiantes.map((est, idx) => (
                            <tr key={est.estudianteId} style={{ borderTop: '1px solid #232527', background: idx % 2 === 0 ? '#181A1B' : '#232734' }}>
                              <td style={{ padding: 8 }}>{est.nombre}</td>
                              <td style={{ padding: 8, color: '#b0b3b8', fontSize: 14 }}>{est.documento}</td>
                              <td style={{ padding: 8 }}>{est.gradoActual.nombre} {est.gradoActual.seccion}</td>
                              <td style={{ padding: 8, textAlign: 'center', fontWeight: 600, color: est.promedioGeneral >= 3.0 ? '#22c55e' : est.promedioGeneral > 0 ? '#f59e0b' : '#888' }}>
                                {est.promedioGeneral > 0 ? est.promedioGeneral.toFixed(2) : 'N/A'}
                              </td>
                              <td style={{ padding: 8, textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                                  <button
                                    style={{
                                      background: procesandoId === est.estudianteId ? '#22c55e99' : '#22c55e',
                                      color: '#fff',
                                      borderRadius: 4,
                                      padding: '6px 12px',
                                      fontWeight: 600,
                                      border: 'none',
                                      cursor: procesandoId === est.estudianteId ? 'not-allowed' : 'pointer',
                                      fontSize: 12,
                                      whiteSpace: 'nowrap'
                                    }}
                                    onClick={() => handlePromocionar(est.estudianteId, 'paso')}
                                    disabled={procesandoId !== null}
                                    title="Promover al siguiente grado"
                                  >
                                    {procesandoId === est.estudianteId ? '...' : 'Pasó ✓'}
                                  </button>
                                  <button
                                    style={{
                                      background: procesandoId === est.estudianteId ? '#f5970099' : '#f59e0b',
                                      color: '#fff',
                                      borderRadius: 4,
                                      padding: '6px 12px',
                                      fontWeight: 600,
                                      border: 'none',
                                      cursor: procesandoId === est.estudianteId ? 'not-allowed' : 'pointer',
                                      fontSize: 12,
                                      whiteSpace: 'nowrap'
                                    }}
                                    onClick={() => handlePromocionar(est.estudianteId, 'perdio')}
                                    disabled={procesandoId !== null}
                                    title="Retener en el mismo grado"
                                  >
                                    {procesandoId === est.estudianteId ? '...' : 'Perdió ✗'}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {/* Mensajes de estado */}
            {error && (
              <div style={{
                marginTop: 16,
                padding: 12,
                background: '#dc2626' + '20',
                border: '1px solid #dc2626',
                borderRadius: 6,
                color: '#dc2626',
                fontWeight: 500
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{
                marginTop: 16,
                padding: 12,
                background: '#22c55e' + '20',
                border: '1px solid #22c55e',
                borderRadius: 6,
                color: '#22c55e',
                fontWeight: 500
              }}>
                {success}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
