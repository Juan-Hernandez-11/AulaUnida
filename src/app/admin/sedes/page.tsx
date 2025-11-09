"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import LoadingModal from '@/components/ui/LoadingModal';
import useDelayedOpen from '@/hooks/useDelayedOpen';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import sedesStyles from '../../../styles/sedes.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/ui/Button';
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
  <div className={sedesStyles.backWrapper}>
  <NextLink href="/admin" className={sedesStyles.backLink}>
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

  const delayedOpen = useDelayedOpen(loading);

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
          <div className={sedesStyles.brand}>
            <Image src="/favicon.ico" alt="AulaUnida Admin" className={styles.avatar} width={32} height={32} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul className={sedesStyles.menuList}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${link.active ? styles.menuItemActive : ''}`}>
                    <link.icon className={sedesStyles.linkIcon} />
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
              className={sedesStyles.formContainer}
              onSubmit={handleSubmit}
            >
              <div className={`${sedesStyles.formGroup} ${sedesStyles['flex1']}`}>
                <label htmlFor="nombre" className={sedesStyles.label}>Nombre de la sede</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: Sede Central"
                  className={sedesStyles.input}
                />
                {fieldErrors.nombre && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.nombre}</span>}
              </div>
              <div className={`${sedesStyles.formGroup} ${sedesStyles['flex2']}`}>
                <label htmlFor="direccion" className={sedesStyles.label}>Dirección</label>
                <input
                  id="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: Calle 123 #45-67"
                  className={sedesStyles.input}
                />
                {fieldErrors.direccion && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.direccion}</span>}
              </div>
              <button
                className={`${sedesStyles.buttonPrimary} ${creating ? sedesStyles.disabled : ''}`}
                type="submit"
                disabled={creating || !!fieldErrors.nombre || !!fieldErrors.direccion || !form.nombre.trim() || !form.direccion.trim()}
                aria-disabled={creating || !!fieldErrors.nombre || !!fieldErrors.direccion || !form.nombre.trim() || !form.direccion.trim()}
              >
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  className={sedesStyles.buttonCancel}
                  onClick={() => { setEditingId(null); setForm({ nombre: '', direccion: '' }); setError(''); setSuccess(''); }}
                  disabled={creating}
                  aria-disabled={creating}
                >
                  Cancelar
                </button>
              )}
            </form>
            {error && <div style={{ color: '#f87171', marginBottom: 12, fontWeight: 500 }}>{error}</div>}
            {success && <div className={sedesStyles.successMsg}>{success}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Sedes</h2>
            {loading ? (
              <LoadingModal open={delayedOpen} message="Cargando sedes..." />
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
                    <tr><td colSpan={3} className={sedesStyles.emptyRow}>Sin sedes registradas</td></tr>
                  ) : (
                    sedes.map((s, idx) => (
                      <tr key={s.id || idx}>
                        <td className={styles.activityUser}>{s.nombre}</td>
                        <td className={styles.activityAction}>{s.direccion}</td>
                        <td className={styles.activityAction}>
                          <div className={sedesStyles.tableActionCell}>
                            <Button className={sedesStyles.actionPrimary} variant="ghost" onClick={() => handleEdit(s)}>Editar</Button>
                            <Button className={sedesStyles.actionDelete} onClick={() => handleDelete(s.id)}>Eliminar</Button>
                          </div>
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
