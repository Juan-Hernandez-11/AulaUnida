"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

type Sede = { id: number; nombre: string; direccion: string };

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
  { label: 'Sedes', icon: AcademicCapIcon, href: '/admin/sedes', active: true },
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

export default function AdminSedesPage() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [form, setForm] = useState({ nombre: '', direccion: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; direccion?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/sedes')
      .then(res => res.json())
      .then(data => {
        setSedes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre de la sede es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
      else if (sedes.some(s => s.nombre.toLowerCase() === value.trim().toLowerCase() && (!editingId || s.id !== editingId))) error = 'Ya existe una sede con ese nombre.';
    }
    if (name === 'direccion') {
      if (!value.trim()) error = 'La dirección es obligatoria.';
      else if (value.length < 5) error = 'Debe tener al menos 5 caracteres.';
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
      direccion: validateField('direccion', form.direccion),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.direccion) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/sedes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar sede');
        } else {
          const updated = await res.json();
          setSedes(prev => prev.map(s => s.id === updated.id ? updated : s));
          setForm({ nombre: '', direccion: '' });
          setEditingId(null);
          setSuccess('Sede editada correctamente.');
        }
      } else {
        const res = await fetch('/api/admin/sedes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear sede');
        } else {
          const nueva = await res.json();
          setSedes(prev => [...prev, nueva]);
          setForm({ nombre: '', direccion: '' });
          setSuccess('Sede creada correctamente.');
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta sede?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/sedes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar sede');
      } else {
        setSedes(prev => prev.filter(s => s.id !== id));
        setSuccess('Sede eliminada correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEdit = (sede: Sede) => {
    setForm({ nombre: sede.nombre, direccion: sede.direccion });
    setEditingId(sede.id);
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
          <h1 className={styles.title}>Gestión de Sedes</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Sede' : 'Crear Sede'}</h2>
            <form
              style={{ display: 'flex', gap: 16, marginBottom: 24, background: '#232734', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
              onSubmit={handleSubmit}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label htmlFor="nombre" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Nombre de la sede</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: Sede Central"
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.nombre && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.nombre}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                <label htmlFor="direccion" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Dirección</label>
                <input
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: Calle 123 #45-67"
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.direccion && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.direccion}</span>}
              </div>
              <button
                style={{ background: creating ? '#2563eb99' : '#2563eb', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', cursor: creating ? 'not-allowed' : 'pointer', marginTop: 24, minWidth: 120 }}
                type="submit"
                disabled={creating || !!fieldErrors.nombre || !!fieldErrors.direccion || !form.nombre.trim() || !form.direccion.trim()}
                aria-disabled={creating || !!fieldErrors.nombre || !!fieldErrors.direccion || !form.nombre.trim() || !form.direccion.trim()}
              >
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  style={{ background: '#888', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', marginTop: 24, minWidth: 120 }}
                  onClick={() => { setEditingId(null); setForm({ nombre: '', direccion: '' }); setError(''); setSuccess(''); }}
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
            <h2 className={styles.activityTitle}>Listado de Sedes</h2>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando sedes...</div>
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {sedes.length === 0 ? (
                    <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin sedes registradas</td></tr>
                  ) : (
                    sedes.map((s, idx) => (
                      <tr key={s.id || idx}>
                        <td className={styles.activityUser}>{s.nombre}</td>
                        <td className={styles.activityAction}>{s.direccion}</td>
                        <td className={styles.activityAction}>
                          <button style={{ color: '#2563eb', marginRight: 8 }} onClick={() => handleEdit(s)}>Editar</button>
                          <button style={{ color: '#dc2626' }} onClick={() => handleDelete(s.id)}>Eliminar</button>
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
