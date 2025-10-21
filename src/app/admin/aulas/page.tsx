"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';
import Button from '../../../components/ui/Button';

type Aula = { id: number; codigo: string; nombre: string; sedeId: number; sede: { nombre: string } };
type Sede = { id: number; nombre: string };

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
  { label: 'Sedes', icon: AcademicCapIcon, href: '/admin/sedes' },
  { label: 'Aulas', icon: AcademicCapIcon, href: '/admin/aulas', active: true },
];

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

export default function AdminAulasPage() {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [form, setForm] = useState({ codigo: '', nombre: '', sedeId: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ codigo?: string; nombre?: string; sedeId?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/aulas').then(res => res.json()),
      fetch('/api/admin/sedes').then(res => res.json()),
    ]).then(([aulas, sedes]) => {
      setAulas(aulas);
      setSedes(sedes);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'codigo') {
      if (!value.trim()) error = 'El código es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
      else if (aulas.some(a => a.codigo.toLowerCase() === value.trim().toLowerCase() && (!editingId || a.id !== editingId))) error = 'Ya existe un aula con ese código.';
    }
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
    }
    if (name === 'sedeId') {
      if (!value.trim()) error = 'Debes seleccionar una sede.';
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      codigo: validateField('codigo', form.codigo),
      nombre: validateField('nombre', form.nombre),
      sedeId: validateField('sedeId', form.sedeId),
    };
    setFieldErrors(newErrors);
    if (newErrors.codigo || newErrors.nombre || newErrors.sedeId) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/aulas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, codigo: form.codigo, nombre: form.nombre, sedeId: Number(form.sedeId) }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar aula');
        } else {
          const updated = await res.json();
          setAulas(prev => prev.map(a => a.id === updated.id ? updated : a));
          setForm({ codigo: '', nombre: '', sedeId: '' });
          setEditingId(null);
          setSuccess('Aula editada correctamente.');
        }
      } else {
        const res = await fetch('/api/admin/aulas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ codigo: form.codigo, nombre: form.nombre, sedeId: Number(form.sedeId) }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear aula');
        } else {
          const nueva = await res.json();
          setAulas(prev => [...prev, nueva]);
          setForm({ codigo: '', nombre: '', sedeId: '' });
          setSuccess('Aula creada correctamente.');
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta aula?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/aulas', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar aula');
      } else {
        setAulas(prev => prev.filter(a => a.id !== id));
        setSuccess('Aula eliminada correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEdit = (aula: Aula) => {
    setForm({ codigo: aula.codigo, nombre: aula.nombre, sedeId: String(aula.sedeId) });
    setEditingId(aula.id);
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
      <div style={{ marginBottom: 24 }}>
      <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 500 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              Volver al Dashboard
            </NextLink>
          </div>
          <h1 className={styles.title}>Gestión de Aulas</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Aula' : 'Crear Aula'}</h2>
            <form
              style={{ display: 'flex', gap: 16, marginBottom: 24, background: '#232734', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
              onSubmit={handleSubmit}
            >
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label htmlFor="codigo" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Código</label>
                <input
                  id="codigo"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: AULA-101"
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.codigo && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.codigo}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                <label htmlFor="nombre" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Nombre del aula</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: Laboratorio 1"
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                />
                {fieldErrors.nombre && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.nombre}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                <label htmlFor="sedeId" style={{ color: '#fff', fontWeight: 500, marginBottom: 4 }}>Sede</label>
                <select
                  id="sedeId"
                  name="sedeId"
                  value={form.sedeId}
                  onChange={handleChange}
                  disabled={creating}
                  style={{ marginBottom: 2, background: '#181A1B', color: '#fff', border: '1.5px solid #232527', borderRadius: 6, padding: '10px 14px', fontSize: 16, outline: 'none', boxShadow: 'none' }}
                  onFocus={e => e.currentTarget.style.border = '1.5px solid #22c55e'}
                  onBlur={e => e.currentTarget.style.border = '1.5px solid #232527'}
                >
                  <option value="">Selecciona una sede</option>
                  {sedes.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
                {fieldErrors.sedeId && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.sedeId}</span>}
              </div>
              <button
                style={{ background: creating ? '#10b98199' : 'var(--color-primary)', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', cursor: creating ? 'not-allowed' : 'pointer', marginTop: 24, minWidth: 120 }}
                type="submit"
                disabled={creating || !!fieldErrors.codigo || !!fieldErrors.nombre || !!fieldErrors.sedeId || !form.codigo.trim() || !form.nombre.trim() || !form.sedeId.trim()}
                aria-disabled={creating || !!fieldErrors.codigo || !!fieldErrors.nombre || !!fieldErrors.sedeId || !form.codigo.trim() || !form.nombre.trim() || !form.sedeId.trim()}
              >
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  style={{ background: '#888', color: '#fff', borderRadius: 6, padding: '10px 24px', fontWeight: 700, border: 'none', marginTop: 24, minWidth: 120 }}
                  onClick={() => { setEditingId(null); setForm({ codigo: '', nombre: '', sedeId: '' }); setError(''); setSuccess(''); }}
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
            <h2 className={styles.activityTitle}>Listado de Aulas</h2>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando aulas...</div>
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Sede</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {aulas.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin aulas registradas</td></tr>
                  ) : (
                    aulas.map((a, idx) => (
                      <tr key={a.id || idx}>
                        <td className={styles.activityUser}>{a.codigo}</td>
                        <td className={styles.activityAction}>{a.nombre}</td>
                        <td className={styles.activityAction}>{a.sede?.nombre || ''}</td>
                        <td className={styles.activityAction}>
                          <Button style={{ color: 'var(--color-primary)', marginRight: 8 }} onClick={() => handleEdit(a)}>Editar</Button>
                          <Button style={{ color: '#dc2626' }} onClick={() => handleDelete(a.id)}>Eliminar</Button>
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
