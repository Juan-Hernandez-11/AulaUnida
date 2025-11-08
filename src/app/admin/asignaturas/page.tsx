"use client";

import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import formStyles from '../../../styles/admin-asignaturas-form.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

// Botón de volver reutilizable
function BackToDashboardButton() {
  return (
    <div style={{ marginBottom: 24 }}>
      <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2563eb', fontWeight: 500 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}

// Tipos para grado, docente y asignatura (se mantienen igual)
interface Grado {
  id: number;
  nombre: string;
  seccion: string;
}

interface Asignacion {
  gradoId: number;
  docenteId: number;
  periodoId?: number;
}
interface Docente {
  id: number;
  name: string;
}
interface Asignatura {
  id: number;
  nombre: string;
  area: string;
  codigo: string;
  grados: Grado[];
  docenteId?: number;
  docente?: Docente;
}

// Sidebar links para navegación admin
const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Asignaturas', icon: BookOpenIcon, href: '/admin/asignaturas', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminAsignaturasPage() {
  // --- ESTADO Y LÓGICA PRINCIPAL (SE CONSERVAN TUS COMENTARIOS) ---
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [grados, setGrados] = useState<Grado[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ nombre: string; area: string; codigo: string; gradoIds: string[]; asignaciones: Asignacion[] }>({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [lastCreatedId, setLastCreatedId] = useState<number | null>(null);
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; area?: string; codigo?: string; gradoIds?: string }>({});

  // Cargar docentes al montar el componente y después de crear/editar
  const fetchDocentes = async () => {
    try {
      const res = await fetch('/api/admin/docentes');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setDocentes(data);
      }
    } catch {}
  };

  // Cargar asignaturas al montar y después de crear/editar
  const fetchAsignaturas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/asignaturas');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setAsignaturas(data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchDocentes();
    fetchAsignaturas();
  }, []);

  // Validación en tiempo real
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
    }
    if (name === 'area') {
      if (!value.trim()) error = 'El área es obligatoria.';
    }
    if (name === 'codigo') {
      if (!value.trim()) error = 'El código es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
    }
    if (name === 'gradoIds') {
      if (!value.trim()) error = 'Debes seleccionar al menos un grado.';
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, multiple, options } = e.target as HTMLSelectElement;
    if (multiple) {
      const values = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm({ ...form, [name]: values });
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, values.join(',')) }));
    } else {
      setForm({ ...form, [name]: value });
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Maneja el cambio de docente para un grado específico
  const handleDocenteChange = (gradoId: number, docenteId: string) => {
    setForm(prev => {
      const asignaciones = prev.asignaciones.filter(a => a.gradoId !== gradoId);
      if (docenteId) {
        asignaciones.push({ gradoId, docenteId: Number(docenteId) });
      }
      return { ...prev, asignaciones };
    });
  };

  // Función para asignar el mismo docente a todos los grados
  const asignarMismoDocente = (docenteId: string) => {
    if (!docenteId || form.gradoIds.length === 0) return;
    
    const nuevasAsignaciones = form.gradoIds.map(gradoId => ({
      gradoId: Number(gradoId),
      docenteId: Number(docenteId)
    }));
    
    setForm(prev => ({ ...prev, asignaciones: nuevasAsignaciones }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      area: validateField('area', form.area),
      codigo: validateField('codigo', form.codigo),
      gradoIds: validateField('gradoIds', form.gradoIds.join(',')),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.area || newErrors.codigo || newErrors.gradoIds) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      const payload = {
        nombre: form.nombre,
        area: form.area,
        codigo: form.codigo,
        gradoIds: form.gradoIds.map(Number),
        asignaciones: form.asignaciones
      };
      if (editingId) {
        const res = await fetch('/api/admin/asignaturas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar asignatura');
          setSuccess('');
        } else {
          const updated = await res.json();
          setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] });
          setEditingId(null);
          setSuccess('Asignatura actualizada correctamente.');
          setLastCreatedId(updated.id);
          await fetchDocentes();
          await fetchAsignaturas();
        }
      } else {
        const res = await fetch('/api/admin/asignaturas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear asignatura');
          setSuccess('');
        } else {
          const nueva = await res.json();
          setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] });
          setSuccess('Asignatura creada correctamente.');
          setLastCreatedId(nueva.id);
          await fetchDocentes();
          await fetchAsignaturas();
        }
      }
    } catch {
      setError('Error de red');
      setSuccess('');
    }
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta asignatura?')) return;
    try {
      const res = await fetch('/api/admin/asignaturas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar asignatura');
      } else {
        setAsignaturas(prev => prev.filter(a => a.id !== id));
      }
    } catch {
      setError('Error de red');
    }
  };

  const handleEdit = (asig: Asignatura) => {
    setForm({
      nombre: asig.nombre,
      area: asig.area,
      codigo: asig.codigo,
      gradoIds: asig.grados ? asig.grados.map(g => String(g.id)) : [],
      asignaciones: asig.grados
        ? asig.grados
            .filter(g => Array.isArray((g as any).docentes) && (g as any).docentes.length > 0)
            .map(g => ({ gradoId: g.id, docenteId: (g as any).docentes[0].id }))
        : [],
    });
    setEditingId(asig.id);
    setError('');
    setSuccess('');
    setFieldErrors({}); // Limpiar errores de validación
  };

  // Cargar grados al montar el componente
  useEffect(() => {
    fetch('/api/admin/grados')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setGrados(data);
      });
  }, []);

  // --- LAYOUT VISUAL MODERNO Y CONSISTENTE ---
  // Se agrega el sidebar y layout del dashboard admin, manteniendo tu lógica y comentarios intactos.
  return (
  <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar de navegación admin */}
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
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
        {/* Main Content: aquí va tu lógica y UI original */}
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <h1 className={styles.title}>Gestión de Asignaturas</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>
              {editingId 
                ? `Editar Asignatura: ${form.nombre}` 
                : 'Crear Nueva Asignatura'
              }
            </h2>
            {editingId && (
              <p style={{ color: '#64748B', marginBottom: '1rem', fontSize: '14px' }}>
                Puedes agregar o quitar grados, y cambiar la asignación de docentes para esta asignatura.
              </p>
            )}
            <form className={formStyles.formBox} onSubmit={handleSubmit}>
              <div className={formStyles.field}>
                <label htmlFor="nombre" className={formStyles.label}>Nombre</label>
                <input
                  id="nombre"
                  className={formStyles.input}
                  placeholder="Nombre de la asignatura"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.nombre && <span className={formStyles.error}>{fieldErrors.nombre}</span>}
              </div>
              <div className={formStyles.field}>
                <label htmlFor="area" className={formStyles.label}>Área</label>
                <input
                  id="area"
                  className={formStyles.input}
                  placeholder="Área de la asignatura"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.area && <span className={formStyles.error}>{fieldErrors.area}</span>}
              </div>
              <div className={formStyles.field}>
                <label htmlFor="codigo" className={formStyles.label}>Código</label>
                <input
                  id="codigo"
                  className={formStyles.input}
                  placeholder="Código de la asignatura"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.codigo && <span className={formStyles.error}>{fieldErrors.codigo}</span>}
              </div>
              <div className={formStyles.field}>
                <label htmlFor="gradoIds" className={formStyles.label}>
                  Grados 
                  <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '8px' }}>
                    (Mantén Ctrl presionado para seleccionar múltiples grados)
                  </span>
                </label>
                {editingId && (
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#0ea5e9', 
                    marginBottom: '8px',
                    padding: '8px 12px',
                    backgroundColor: '#0f172a',
                    borderRadius: '4px',
                    border: '1px solid #1e40af'
                  }}>
                    Modo edición: Puedes agregar o quitar grados. Los grados actuales se mantendrán a menos que los deselecciones.
                  </div>
                )}
                <select
                  id="gradoIds"
                  multiple
                  className={formStyles.select}
                  name="gradoIds"
                  value={form.gradoIds}
                  onChange={handleChange}
                  disabled={creating}
                  style={{ minHeight: '100px' }}
                >
                  {grados.length === 0 ? (
                    <option value="" disabled>No hay grados disponibles</option>
                  ) : (
                    grados.map(g => <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>)
                  )}
                </select>
                {form.gradoIds.length > 0 && (
                  <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>
                    {form.gradoIds.length} grado(s) seleccionado(s): {
                      form.gradoIds.map(id => {
                        const grado = grados.find(g => String(g.id) === id);
                        return grado ? `${grado.nombre} ${grado.seccion}` : '';
                      }).join(', ')
                    }
                  </div>
                )}
                {fieldErrors.gradoIds && <span className={formStyles.error}>{fieldErrors.gradoIds}</span>}
              </div>
              <div className={formStyles.field}>
                <label className={formStyles.label}>
                  Docente por grado
                  <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '8px' }}>
                    (Puedes asignar el mismo docente a múltiples grados)
                  </span>
                </label>
                {form.gradoIds.length === 0 ? (
                  <div style={{ color: '#64748B', fontSize: 14, padding: '12px', border: '1px dashed #374151', borderRadius: '6px', textAlign: 'center' }}>
                    Primero selecciona uno o más grados arriba
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Botón de asignación rápida */}
                    {form.gradoIds.length > 1 && (
                      <div style={{ 
                        padding: '12px', 
                        backgroundColor: '#0f172a', 
                        borderRadius: '6px',
                        border: '1px solid #1e40af'
                      }}>
                        <div style={{ fontSize: '14px', color: '#0ea5e9', marginBottom: '8px', fontWeight: 500 }}>
                          Asignación Rápida: Mismo docente para todos los grados
                          {editingId && <span style={{ marginLeft: '8px', fontSize: '12px' }}>(incluye grados nuevos)</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <select
                            className={formStyles.select}
                            onChange={e => asignarMismoDocente(e.target.value)}
                            disabled={creating}
                            style={{ flex: 1 }}
                          >
                            <option value="">Seleccionar docente para todos...</option>
                            {docentes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                        </div>
                      </div>
                    )}
                    
                    {form.gradoIds.map(gradoId => {
                      const grado = grados.find(g => String(g.id) === gradoId);
                      return (
                        <div key={gradoId} style={{ 
                          padding: '12px', 
                          backgroundColor: '#1E293B', 
                          borderRadius: '6px',
                          border: '1px solid #334155'
                        }}>
                          <div style={{ 
                            fontWeight: 600, 
                            color: '#22c55e', 
                            marginBottom: '8px',
                            fontSize: '14px'
                          }}>
                            {grado?.nombre} {grado?.seccion}
                          </div>
                          <select
                            className={formStyles.select}
                            value={form.asignaciones.find(a => a.gradoId === Number(gradoId))?.docenteId || ''}
                            onChange={e => handleDocenteChange(Number(gradoId), e.target.value)}
                            disabled={creating}
                            style={{ marginTop: 0 }}
                          >
                            <option value="">Seleccionar docente...</option>
                            {docentes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                          </select>
                        </div>
                      );
                    })}
                    {form.gradoIds.length > 1 && (
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#0ea5e9', 
                        padding: '8px 12px',
                        backgroundColor: '#0f172a',
                        borderRadius: '4px',
                        border: '1px solid #1e40af'
                      }}>
                        Tip: Puedes seleccionar el mismo docente para todos los grados si quieres que dé la misma materia en múltiples cursos
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={formStyles.buttonBox}>
                <button
                  type="submit"
                  className={formStyles.saveButton}
                  disabled={creating || !!fieldErrors.nombre || !!fieldErrors.area || !!fieldErrors.codigo || !!fieldErrors.gradoIds}
                >
                  {creating 
                    ? (editingId ? 'Guardando cambios...' : 'Creando asignatura...') 
                    : (editingId ? 'Actualizar asignatura' : 'Crear asignatura')
                  }
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    style={{
                      background: '#64748B',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '10px 24px',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '12px',
                      fontSize: '16px'
                    }}
                    onClick={() => { 
                      setEditingId(null); 
                      setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] }); 
                      setError(''); 
                      setSuccess('');
                      setFieldErrors({});
                    }} 
                    disabled={creating}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Asignaturas</h2>
            {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando asignaturas...</div>
            ) : (
              <table className={styles.activityTable} ref={tableRef}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Área</th>
                    <th>Código</th>
                    <th>Grado</th>
                    <th>Docente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asignaturas.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin asignaturas registradas</td></tr>
                  ) : (
                    asignaturas.map((a, idx) => (
                      <tr key={a.id || idx} style={lastCreatedId === a.id ? { background: '#e0ffe0', fontWeight: 600 } : {}}>
                        <td className={styles.activityUser}>{a.nombre}</td>
                        <td className={styles.activityAction}>{a.area}</td>
                        <td className={styles.activityAction}>{a.codigo}</td>
                        <td className={styles.activityAction}>
                          {a.grados && a.grados.length > 0 ? (
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                              {a.grados.map(g => (
                                <li key={g.id}>
                                  <strong>{g.nombre} {g.seccion}:</strong> {Array.isArray((g as any).docentes) && (g as any).docentes.length > 0
                                    ? (g as any).docentes.map((d: any) => d.name).join(', ')
                                    : <span style={{ color: '#888' }}>Sin docente</span>}
                                </li>
                              ))}
                            </ul>
                          ) : '-'}
                        </td>
                        <td className={styles.activityAction}>
                          <button style={{ color: '#2563eb', marginRight: 8 }} onClick={() => handleEdit(a)}>Editar</button>
                          <button style={{ color: '#dc2626' }} onClick={() => handleDelete(a.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
