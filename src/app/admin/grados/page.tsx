"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import LoadingModal from '@/components/ui/LoadingModal';
import useDelayedOpen from '@/hooks/useDelayedOpen';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import gradosStyles from '../../../styles/grados.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';
import Button from '../../../components/ui/Button';

// Botón de volver reutilizable
function BackToDashboardButton() {
  return (
    <div className={gradosStyles.backWrapper}>
  <NextLink href="/admin" className={gradosStyles.backLink}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}

// Tipo para grado (se mantiene igual)
type Grado = {
  id: number;
  nombre: string;
  seccion: string;
  sedeId?: number;
  cicloId?: number;
  aulaId?: number;
};

// Tipos para sede, ciclo y aula
// Puedes mover estos tipos a tu archivo de tipos si lo prefieres
type Sede = { id: number; nombre: string };
type Ciclo = { id: number; nombre: string };
type Aula = { id: number; nombre: string };

// Sidebar links para navegación admin
const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminGradosPage() {
  // --- ESTADO Y LÓGICA PRINCIPAL (SE CONSERVAN TUS COMENTARIOS) ---
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(true);
  // Estados para selects
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [aulas, setAulas] = useState<Aula[]>([]);
  // Agrega los campos al form
  const [form, setForm] = useState({ nombre: '', seccion: '', sedeId: '', cicloId: '', aulaId: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; seccion?: string; sedeId?: string; cicloId?: string; aulaId?: string }>({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/grados').then(res => res.json()),
      fetch('/api/admin/sedes').then(res => res.json()),
      fetch('/api/admin/ciclos').then(res => res.json()),
      fetch('/api/admin/aulas').then(res => res.json()),
    ]).then(([grados, sedes, ciclos, aulas]) => {
      setGrados(grados);
      setSedes(sedes);
      setCiclos(ciclos);
      setAulas(aulas);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Validación en tiempo real extendida
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre del grado es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
      else if (grados.some(g => g.nombre.toLowerCase() === value.trim().toLowerCase() && (!editingId || g.id !== editingId) && g.seccion.toLowerCase() === form.seccion.trim().toLowerCase())) error = 'Ya existe un grado con ese nombre y sección.';
    }
    if (name === 'seccion') {
      if (!value.trim()) error = 'La sección es obligatoria.';
      else if (value.length < 1) error = 'Debe tener al menos 1 caracter.';
      else if (grados.some(g => g.seccion.toLowerCase() === value.trim().toLowerCase() && g.nombre.toLowerCase() === form.nombre.trim().toLowerCase() && (!editingId || g.id !== editingId))) error = 'Ya existe un grado con ese nombre y sección.';
    }
    if (name === 'sedeId') {
      if (!value) error = 'Debes seleccionar una sede.';
    }
    if (name === 'cicloId') {
      if (!value) error = 'Debes seleccionar un ciclo.';
    }
    // aulaId es opcional
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
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      seccion: validateField('seccion', form.seccion),
      sedeId: validateField('sedeId', form.sedeId),
      cicloId: validateField('cicloId', form.cicloId),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.seccion || newErrors.sedeId || newErrors.cicloId) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      // Prepara los datos convirtiendo los IDs a número
      const payload = {
        nombre: form.nombre,
        seccion: form.seccion,
        sedeId: form.sedeId ? Number(form.sedeId) : undefined,
        cicloId: form.cicloId ? Number(form.cicloId) : undefined,
        aulaId: form.aulaId ? Number(form.aulaId) : undefined,
      };
      if (editingId) {
        const res = await fetch('/api/admin/grados', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar grado');
        } else {
          const updated = await res.json();
          setGrados(prev => prev.map(g => g.id === updated.id ? updated : g));
          setForm({ nombre: '', seccion: '', sedeId: '', cicloId: '', aulaId: '' });
          setEditingId(null);
          setSuccess('Grado editado correctamente.');
        }
      } else {
        const res = await fetch('/api/admin/grados', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear grado');
        } else {
          const nuevo = await res.json();
          setGrados(prev => [...prev, nuevo]);
          setForm({ nombre: '', seccion: '', sedeId: '', cicloId: '', aulaId: '' });
          setSuccess('Grado creado correctamente.');
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este grado?')) return;
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/grados', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar grado');
      } else {
        setGrados(prev => prev.filter(g => g.id !== id));
        setSuccess('Grado eliminado correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEdit = (grado: Grado) => {
    setForm({
      nombre: grado.nombre,
      seccion: grado.seccion,
      sedeId: grado.sedeId !== undefined ? String(grado.sedeId) : '',
      cicloId: grado.cicloId !== undefined ? String(grado.cicloId) : '',
      aulaId: grado.aulaId !== undefined ? String(grado.aulaId) : ''
    });
    setEditingId(grado.id);
    setError('');
    setSuccess('');
  };

  // --- LAYOUT VISUAL MODERNO Y CONSISTENTE ---
  // Se agrega el sidebar y layout del dashboard admin, manteniendo tu lógica y comentarios intactos.
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        {/* Sidebar de navegación admin */}
        <aside className={styles.sidebar}>
          <div className={gradosStyles.brand}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul className={gradosStyles.menuList}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${link.active ? styles.menuItemActive : ''}`}>
                    <link.icon className={gradosStyles.linkIcon} />
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
          <h1 className={styles.title}>Gestión de Grados y Secciones</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Grado' : 'Crear Grado'}</h2>
            {/* Formulario de creación/edición de grado */}
            <form
              className={gradosStyles.formContainer}
              onSubmit={handleSubmit}
            >
              <div className={`${gradosStyles.formGroup} ${gradosStyles.flex1}`}>
                <label htmlFor="nombre" className={gradosStyles.label}>Nombre del grado</label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: 1° Básico"
                  className={gradosStyles.input}
                />
                {fieldErrors.nombre && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.nombre}</span>}
              </div>
              <div className={`${gradosStyles.formGroup} ${gradosStyles.flex1}`}>
                <label htmlFor="seccion" className={gradosStyles.label}>Sección</label>
                <input
                  id="seccion"
                  name="seccion"
                  value={form.seccion}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                  placeholder="Ej: A"
                  className={gradosStyles.input}
                />
                {fieldErrors.seccion && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.seccion}</span>}
              </div>
              <div className={`${gradosStyles.formGroup} ${gradosStyles.flex1}`}>
                <label htmlFor="sedeId" className={gradosStyles.label}>Sede</label>
                <select
                  id="sedeId"
                  name="sedeId"
                  value={form.sedeId}
                  onChange={handleChange}
                  disabled={creating}
                  className={gradosStyles.select}
                >
                  <option value="">Selecciona sede</option>
                  {sedes.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
                {fieldErrors.sedeId && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.sedeId}</span>}
              </div>
              <div className={`${gradosStyles.formGroup} ${gradosStyles.flex1}`}>
                <label htmlFor="cicloId" className={gradosStyles.label}>Ciclo</label>
                <select
                  id="cicloId"
                  name="cicloId"
                  value={form.cicloId}
                  onChange={handleChange}
                  disabled={creating}
                  className={gradosStyles.select}
                >
                  <option value="">Selecciona ciclo</option>
                  {ciclos.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
                {fieldErrors.cicloId && <span style={{ color: '#f87171', fontSize: 13 }}>{fieldErrors.cicloId}</span>}
              </div>
              <div className={`${gradosStyles.formGroup} ${gradosStyles.flex1}`}>
                <label htmlFor="aulaId" className={gradosStyles.label}>Aula (opcional)</label>
                <select
                  id="aulaId"
                  name="aulaId"
                  value={form.aulaId}
                  onChange={handleChange}
                  disabled={creating}
                  className={gradosStyles.select}
                >
                  <option value="">Sin aula asignada</option>
                  {aulas.map(a => (
                    <option key={a.id} value={a.id}>{a.nombre}</option>
                  ))}
                </select>
              </div>
              <button
                className={`${gradosStyles.buttonPrimary} ${creating ? 'disabled' : ''}`}
                type="submit"
                disabled={creating || !!fieldErrors.nombre || !!fieldErrors.seccion || !!fieldErrors.sedeId || !!fieldErrors.cicloId || !form.nombre.trim() || !form.seccion.trim()}
                aria-disabled={creating || !!fieldErrors.nombre || !!fieldErrors.seccion || !!fieldErrors.sedeId || !!fieldErrors.cicloId || !form.nombre.trim() || !form.seccion.trim()}
              >
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button
                  type="button"
                  className={gradosStyles.buttonCancel}
                  onClick={() => { setEditingId(null); setForm({ nombre: '', seccion: '', sedeId: '', cicloId: '', aulaId: '' }); setError(''); setSuccess(''); }}
                  disabled={creating}
                  aria-disabled={creating}
                >
                  Cancelar
                </button>
              )}
            </form>
            {/* Mensajes de error y éxito solo si hay error o éxito real */}
            {error && <div className={gradosStyles.errorMsg}>{error}</div>}
            {success && <div className={gradosStyles.successMsg}>{success}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Grados y Secciones</h2>
            {loading ? (
              <LoadingModal open={useDelayedOpen(loading)} message="Cargando grados..." />
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Grado</th>
                    <th>Sección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {grados.length === 0 ? (
                    <tr><td colSpan={3} className={gradosStyles.emptyRow}>Sin grados registrados</td></tr>
                  ) : (
                    grados.map((g, idx) => (
                      <tr key={g.id || idx}>
                        <td className={styles.activityUser}>{g.nombre}</td>
                        <td className={styles.activityAction}>{g.seccion}</td>
                        <td className={styles.activityAction}>
                          <div className={gradosStyles.tableActionCell}>
                            <Button className={gradosStyles.actionPrimary} variant="ghost" onClick={() => handleEdit(g)}>Editar</Button>
                            <button className={gradosStyles.actionDelete} onClick={() => handleDelete(g.id)}>Eliminar</button>
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
