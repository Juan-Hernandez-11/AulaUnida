'use client';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowDownTrayIcon, UserCircleIcon, AcademicCapIcon, ClipboardIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import NextLink from '@/components/NextLink';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingModal from '@/components/ui/LoadingModal';
import useDelayedOpen from '@/hooks/useDelayedOpen';
import styles from '@/styles/admin-dashboard.module.css';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminReportesPage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [reporte, setReporte] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reporteSeleccionado, setReporteSeleccionado] = useState('resumen');
  const [grados, setGrados] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [gradoId, setGradoId] = useState('');
  const [materiaId, setMateriaId] = useState('');
  const [periodoId, setPeriodoId] = useState('');
  const delayedOpen = useDelayedOpen(loading);

  useEffect(() => {
    if (!user) return;
    loadOpcionesFiltro();
  }, [user]);

  const loadOpcionesFiltro = async () => {
    try {
      const idToken = await user?.getIdToken();

      // Cargar grados
      const gradosRes = await fetch('/api/admin/grados', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (gradosRes.ok) {
        const data = await gradosRes.json();
        setGrados(Array.isArray(data) ? data : data.grados || []);
      }

      // Cargar materias - el endpoint devuelve asignaturas con materias anidadas
      const materiasRes = await fetch('/api/admin/asignaturas', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (materiasRes.ok) {
        const data = await materiasRes.json();
        const asignaturas = Array.isArray(data) ? data : data.asignaturas || [];
        // Aplanar materias de todas las asignaturas
        const todasMaterias = asignaturas.flatMap((a: any) => a.materias || []);
        setMaterias(todasMaterias);
      }

      // Cargar períodos
      const periodosRes = await fetch('/api/admin/periodos', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (periodosRes.ok) {
        const data = await periodosRes.json();
        setPeriodos(Array.isArray(data) ? data : data.periodos || []);
      }
    } catch (err) {
      console.error('Error cargando opciones:', err);
      setError('Error al cargar opciones de filtro');
    }
  };

  const generarReporte = async () => {
    try {
      setLoading(true);
      setError('');
      const idToken = await user?.getIdToken();

      let url = `/api/admin/reportes?tipo=${reporteSeleccionado}`;

      if (reporteSeleccionado === 'estudiantes-grado' && gradoId) {
        url += `&gradoId=${gradoId}`;
      } else if (reporteSeleccionado === 'notas-materia' && materiaId && periodoId) {
        url += `&materiaId=${materiaId}&periodoId=${periodoId}`;
      } else if (reporteSeleccionado === 'asistencia' && materiaId) {
        url += `&materiaId=${materiaId}`;
      }

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReporte(data.reporte);
      } else {
        setError('Error al generar reporte');
      }
    } catch (err) {
      console.error('Error generando reporte:', err);
      setError('Error al generar reporte');
    } finally {
      setLoading(false);
    }
  };

  const exportarCSV = () => {
    if (!reporte) return;

    let csv = '';

    if (reporteSeleccionado === 'resumen') {
      csv = 'Métrica,Valor\n';
      Object.entries(reporte.resumen).forEach(([key, value]) => {
        csv += `${key},${value}\n`;
      });
    } else if (reporteSeleccionado === 'estudiantes-grado') {
      csv = 'Nombre,Email,Documento\n';
      reporte.estudiantes?.forEach((est: any) => {
        csv += `${est.estudiante.name},${est.estudiante.email},${est.estudiante.documentNumber}\n`;
      });
    } else if (reporteSeleccionado === 'notas-materia') {
      csv = 'Estudiante,Email,Nota\n';
      reporte.notas?.forEach((nota: any) => {
        csv += `${nota.estudiante.name},${nota.estudiante.email},${nota.valor}\n`;
      });
    } else if (reporteSeleccionado === 'asistencia') {
      csv = 'Estudiante,Presente,Ausente,Total,Asistencia %\n';
      reporte.asistenciaPorEstudiante?.forEach((asist: any) => {
        const porcentaje = asist.total > 0 ? ((asist.presente / asist.total) * 100).toFixed(1) : 0;
        csv += `${asist.estudiante.name},${asist.presente},${asist.ausente},${asist.total},${porcentaje}%\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${reporteSeleccionado}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${pathname === link.href ? styles.menuItemActive : ''}`}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 className={styles.title}>Generador de Reportes</h1>
          </div>

          {error && <div style={{ color: '#dc2626', marginBottom: '1rem', padding: '0.75rem 1rem', backgroundColor: '#fee2e2', borderRadius: '0.5rem', borderLeft: '4px solid #dc2626' }}>{error}</div>}

          <div className={styles.activityCard} style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#fff' }}>Seleccionar Reporte</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Tipo de Reporte</label>
              <select
                value={reporteSeleccionado}
                onChange={(e) => {
                  setReporteSeleccionado(e.target.value);
                  setReporte(null);
                }}
                style={{
                  padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                  backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', width: '100%',
                }}
              >
                <option value="resumen">Resumen General</option>
                <option value="estudiantes-grado">Estudiantes por Grado</option>
                <option value="notas-materia">Notas por Materia</option>
                <option value="asistencia">Asistencia por Materia</option>
                <option value="docentes">Docentes y Asignaciones</option>
              </select>
            </div>

            {reporteSeleccionado === 'estudiantes-grado' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Grado *</label>
                <select
                  value={gradoId}
                  onChange={(e) => setGradoId(e.target.value)}
                  style={{
                    padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                    backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', width: '100%',
                  }}
                >
                  <option value="">Selecciona un grado</option>
                  {grados.map(g => (
                    <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>
                  ))}
                </select>
              </div>
            )}

            {reporteSeleccionado === 'notas-materia' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Materia *</label>
                  <select
                    value={materiaId}
                    onChange={(e) => setMateriaId(e.target.value)}
                    style={{
                      padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                      backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', width: '100%',
                    }}
                  >
                    <option value="">Selecciona una materia</option>
                    {materias.map(m => (
                      <option key={m.id} value={m.id}>{m.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Periodo *</label>
                  <select
                    value={periodoId}
                    onChange={(e) => setPeriodoId(e.target.value)}
                    style={{
                      padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                      backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', width: '100%',
                    }}
                  >
                    <option value="">Selecciona un período</option>
                    {periodos.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {reporteSeleccionado === 'asistencia' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#fff' }}>Materia *</label>
                <select
                  value={materiaId}
                  onChange={(e) => setMateriaId(e.target.value)}
                  style={{
                    padding: '0.75rem', border: '1px solid #333', borderRadius: '0.375rem',
                    backgroundColor: '#1B1B1B', color: '#fff', fontSize: '0.95rem', width: '100%',
                  }}
                >
                  <option value="">Selecciona una materia</option>
                  {materias.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={generarReporte}
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: loading ? '#6B7280' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontWeight: 500,
              }}
            >
              {loading ? 'Generando...' : 'Generar Reporte'}
            </button>
          </div>

          <LoadingModal open={delayedOpen} message="Generando reporte..." />

          {reporte && (
            <div className={styles.activityCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, color: '#fff' }}>Resultado del Reporte</h2>
                <button
                  onClick={exportarCSV}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                >
                  <ArrowDownTrayIcon style={{ width: 16, height: 16 }} />
                  Descargar CSV
                </button>
              </div>

              {reporteSeleccionado === 'resumen' && (
                <table className={styles.activityTable}>
                  <thead>
                    <tr>
                      <th>Métrica</th>
                      <th style={{ textAlign: 'right' }}>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(reporte.resumen || {}).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {reporteSeleccionado === 'estudiantes-grado' && (
                <>
                  <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#1B1B1B', borderRadius: '0.375rem' }}>
                    <p style={{ margin: '0.25rem 0', color: '#fff', fontWeight: 600 }}>Grado: {reporte.grado?.nombre} {reporte.grado?.seccion}</p>
                    <p style={{ margin: '0.25rem 0', color: '#9CA3AF' }}>Total de estudiantes: {reporte.totalEstudiantes}</p>
                  </div>
                  <table className={styles.activityTable}>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.estudiantes?.map((est: any) => (
                        <tr key={est.id}>
                          <td>{est.estudiante.name}</td>
                          <td>{est.estudiante.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {reporteSeleccionado === 'notas-materia' && (
                <>
                  <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#1B1B1B', borderRadius: '0.375rem' }}>
                    <p style={{ margin: '0.25rem 0', color: '#fff', fontWeight: 600 }}>Materia: {reporte.materia?.nombre} ({reporte.materia?.codigo})</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginTop: '0.75rem' }}>
                      <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Promedio:</span> <span style={{ color: '#10b981', fontWeight: 600 }}>{reporte.estadisticas?.promedio}</span></div>
                      <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Máxima:</span> <span style={{ color: '#10b981', fontWeight: 600 }}>{reporte.estadisticas?.notaMaxima}</span></div>
                      <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Mínima:</span> <span style={{ color: '#10b981', fontWeight: 600 }}>{reporte.estadisticas?.notaMinima}</span></div>
                      <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Estudiantes:</span> <span style={{ color: '#10b981', fontWeight: 600 }}>{reporte.estadisticas?.totalEstudiantes}</span></div>
                    </div>
                  </div>
                  <table className={styles.activityTable}>
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th style={{ textAlign: 'right' }}>Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.notas?.map((nota: any) => (
                        <tr key={nota.id}>
                          <td>{nota.estudiante.name}</td>
                          <td style={{ textAlign: 'right', fontWeight: 600, color: '#10b981' }}>{nota.valor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {reporteSeleccionado === 'asistencia' && (
                <>
                  <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#1B1B1B', borderRadius: '0.375rem' }}>
                    <p style={{ margin: '0.25rem 0', color: '#fff', fontWeight: 600 }}>Materia: {reporte.materia?.nombre}</p>
                  </div>
                  <table className={styles.activityTable}>
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th style={{ textAlign: 'center' }}>Presente</th>
                        <th style={{ textAlign: 'center' }}>Ausente</th>
                        <th style={{ textAlign: 'center' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.asistenciaPorEstudiante?.map((asist: any) => (
                        <tr key={asist.estudiante.id}>
                          <td>{asist.estudiante.name}</td>
                          <td style={{ textAlign: 'center' }}><span style={{ color: '#10b981', fontWeight: 600 }}>{asist.presente}</span></td>
                          <td style={{ textAlign: 'center' }}><span style={{ color: '#dc2626', fontWeight: 600 }}>{asist.ausente}</span></td>
                          <td style={{ textAlign: 'center', color: '#9CA3AF' }}>{asist.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {reporteSeleccionado === 'docentes' && reporte.docentes && (
                <table className={styles.activityTable}>
                  <thead>
                    <tr>
                      <th>Docente</th>
                      <th style={{ textAlign: 'center' }}>Materias</th>
                      <th style={{ textAlign: 'center' }}>Asignaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reporte.docentes.map((doc: any) => (
                      <tr key={doc.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{doc.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>{doc.email}</div>
                        </td>
                        <td style={{ textAlign: 'center' }}>{doc.totalMaterias}</td>
                        <td style={{ textAlign: 'center' }}>{doc.asignacionesGradoMateria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

