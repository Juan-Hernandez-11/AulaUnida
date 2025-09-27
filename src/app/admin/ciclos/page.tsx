"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, CalendarIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

type Ciclo = { id: number; nombre: string; fechaInicio: string; fechaFin: string; cerrado: boolean };

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Ciclos Lectivos', icon: CalendarIcon, href: '/admin/ciclos', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

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

export default function AdminCiclosPage() {
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [form, setForm] = useState({ nombre: '', fechaInicio: '', fechaFin: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; fechaInicio?: string; fechaFin?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/ciclos')
      .then(res => res.json())
      .then(data => {
        setCiclos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre del ciclo es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
      else if (ciclos.some(c => c.nombre.toLowerCase() === value.trim().toLowerCase() && (!editingId || c.id !== editingId))) error = 'Ya existe un ciclo con ese nombre.';
    }
    if (name === 'fechaInicio') {
      if (!value.trim()) error = 'La fecha de inicio es obligatoria.';
    }
    if (name === 'fechaFin') {
      if (!value.trim()) error = 'La fecha de fin es obligatoria.';
      else if (form.fechaInicio && value < form.fechaInicio) error = 'La fecha de fin debe ser posterior a la de inicio.';
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    setSuccess('');
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      fechaInicio: validateField('fechaInicio', form.fechaInicio),
      fechaFin: validateField('fechaFin', form.fechaFin),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.fechaInicio || newErrors.fechaFin) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/ciclos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar ciclo');
        } else {
          const updated = await res.json();
          setCiclos(prev => prev.map(c => c.id === updated.id ? updated : c));
          setForm({ nombre: '', fechaInicio: '', fechaFin: '' });
          setEditingId(null);
          setSuccess('Ciclo editado correctamente.');
        }
      } else {
        const res = await fetch('/api/admin/ciclos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear ciclo');
        } else {
          const nuevo = await res.json();
          setCiclos(prev => [...prev, nuevo]);
          setForm({ nombre: '', fechaInicio: '', fechaFin: '' });
          setSuccess('Ciclo creado correctamente.');
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este ciclo?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/ciclos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar ciclo');
      } else {
        setCiclos(prev => prev.filter(c => c.id !== id));
        setSuccess('Ciclo eliminado correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEdit = (ciclo: Ciclo) => {
    setForm({ nombre: ciclo.nombre, fechaInicio: ciclo.fechaInicio.split('T')[0], fechaFin: ciclo.fechaFin.split('T')[0] });
    setEditingId(ciclo.id);
    setError('');
    setSuccess('');
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
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
                  <NextLink href={link.href} className={`${styles.menuItem} ${link.active ? styles.menuItemActive : ''}`}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <h1 className={styles.title}>Gestión de Ciclos Lectivos</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Ciclo' : 'Crear Ciclo'}</h2>
            <form
              style={{ display: 'flex', gap: 16, marginBottom: 24, background: '#232734', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
              onSubmit={handleSubmit}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                <label htmlFor="nombre" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Nombre del ciclo</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: 2025-A"
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.nombre && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.nombre}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label htmlFor="fechaInicio" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Fecha de inicio</label>
                <input
                  id="fechaInicio"
                  name="fechaInicio"
                  type="date"
                  value={form.fechaInicio}
                  onChange={handleChange}
                  disabled={creating}
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.fechaInicio && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.fechaInicio}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label htmlFor="fechaFin" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Fecha de fin</label>
                <input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"
                  value={form.fechaFin}
                  onChange={handleChange}
                  disabled={creating}
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.fechaFin && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.fechaFin}</span>}
              </div>
              <button
                style={{ background: creating ? '#2563eb99' : '#2563eb', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', cursor: creating ? 'not-allowed' : 'pointer', marginTop: 24, minWidth: 120 }}
                type="submit"
                disabled={creating || !!fieldErrors.nombre || !!fieldErrors.fechaInicio || !!fieldErrors.fechaFin || !form.nombre.trim() || !form.fechaInicio.trim() || !form.fechaFin.trim()}
                aria-disabled={creating || !!fieldErrors.nombre || !!fieldErrors.fechaInicio || !!fieldErrors.fechaFin || !form.nombre.trim() || !form.fechaInicio.trim() || !form.fechaFin.trim()}
              >
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  style={{ background: '#888', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', marginTop: 24, minWidth: 120 }}
                  onClick={() => { setEditingId(null); setForm({ nombre: '', fechaInicio: '', fechaFin: '' }); setError(''); setSuccess(''); }}
                  disabled={creating}
                  aria-disabled={creating}
                >
                  Cancelar
                </button>
              )}
            </form>
            {error && <div style={{ color: '#f87171', marginBottom: 12, fontWeight: 500 }}>{error}</div>}
            {success && <div style={{ color: '#22c55e', marginBottom: 12, fontWeight: 500 }}>{success}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Ciclos Lectivos</h2>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando ciclos...</div>
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha inicio</th>
                    <th>Fecha fin</th>
                    <th>Cerrado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ciclos.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin ciclos registrados</td></tr>
                  ) : (
                    ciclos.map((c, idx) => (
                      <tr key={c.id || idx}>
                        <td className={styles.activityUser}>{c.nombre}</td>
                        <td className={styles.activityAction}>{c.fechaInicio.split('T')[0]}</td>
                        <td className={styles.activityAction}>{c.fechaFin.split('T')[0]}</td>
                        <td className={styles.activityAction}>{c.cerrado ? 'Sí' : 'No'}</td>
                        <td className={styles.activityAction}>
                          <button style={{ color: '#2563eb', marginRight: 8 }} onClick={() => handleEdit(c)}>Editar</button>
                          <button style={{ color: '#dc2626' }} onClick={() => handleDelete(c.id)}>Eliminar</button>
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
