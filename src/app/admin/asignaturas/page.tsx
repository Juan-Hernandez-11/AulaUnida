"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
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
interface Docente {
  id: number;
  name: string;
}
interface Asignatura {
  id: number;
  nombre: string;
  area: string;
  codigo: string;
  gradoId: number;
  docenteId?: number;
  grado?: Grado;
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
  const [form, setForm] = useState({ nombre: '', area: '', codigo: '', gradoId: '', docenteId: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; area?: string; codigo?: string; gradoId?: string }>({});

  // Cargar datos manualmente cuando sea necesario (ejemplo: con un botón o tras crear/editar)

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
    if (name === 'gradoId') {
      if (!value.trim()) error = 'Debes seleccionar un grado.';
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
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      area: validateField('area', form.area),
      codigo: validateField('codigo', form.codigo),
      gradoId: validateField('gradoId', form.gradoId),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.area || newErrors.codigo || newErrors.gradoId) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/asignaturas', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form, gradoId: Number(form.gradoId), docenteId: form.docenteId ? Number(form.docenteId) : undefined }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar asignatura');
        } else {
          const updated = await res.json();
          setAsignaturas(prev => prev.map(a => a.id === updated.id ? updated : a));
          setForm({ nombre: '', area: '', codigo: '', gradoId: '', docenteId: '' });
          setEditingId(null);
        }
      } else {
        const res = await fetch('/api/admin/asignaturas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, gradoId: Number(form.gradoId), docenteId: form.docenteId ? Number(form.docenteId) : undefined }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear asignatura');
        } else {
          const nueva = await res.json();
          setAsignaturas(prev => [...prev, nueva]);
          setForm({ nombre: '', area: '', codigo: '', gradoId: '', docenteId: '' });
        }
      }
    } catch {
      setError('Error de red');
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
      gradoId: String(asig.gradoId),
      docenteId: asig.docenteId ? String(asig.docenteId) : '',
    });
    setEditingId(asig.id);
    setError('');
  };

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
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Asignatura' : 'Crear Asignatura'}</h2>
            {/* Formulario de creación/edición de asignatura */}
            <form style={{ display: 'flex', gap: 16, marginBottom: 24 }} onSubmit={handleSubmit}>
              <div className="flex flex-col flex-1">
                <input className="border p-2 rounded" placeholder="Nombre" name="nombre" value={form.nombre} onChange={handleChange} disabled={creating} autoComplete="off" />
                {fieldErrors.nombre && <span className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <input className="border p-2 rounded" placeholder="Área" name="area" value={form.area} onChange={handleChange} disabled={creating} autoComplete="off" />
                {fieldErrors.area && <span className="text-red-500 text-xs mt-1">{fieldErrors.area}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <input className="border p-2 rounded" placeholder="Código" name="codigo" value={form.codigo} onChange={handleChange} disabled={creating} autoComplete="off" />
                {fieldErrors.codigo && <span className="text-red-500 text-xs mt-1">{fieldErrors.codigo}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <select className="border p-2 rounded" name="gradoId" value={form.gradoId} onChange={handleChange} disabled={creating}>
                  <option value="">Selecciona grado</option>
                  {grados.map(g => <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>)}
                </select>
                {fieldErrors.gradoId && <span className="text-red-500 text-xs mt-1">{fieldErrors.gradoId}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <select className="border p-2 rounded" name="docenteId" value={form.docenteId} onChange={handleChange} disabled={creating}>
                  <option value="">Sin docente asignado</option>
                  {docentes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <button className="bg-blue-500 text-white rounded p-2" type="submit" disabled={creating || !!fieldErrors.nombre || !!fieldErrors.area || !!fieldErrors.codigo || !!fieldErrors.gradoId}>
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button type="button" className="bg-gray-400 text-white rounded p-2" onClick={() => { setEditingId(null); setForm({ nombre: '', area: '', codigo: '', gradoId: '', docenteId: '' }); setError(''); }} disabled={creating}>
                  Cancelar
                </button>
              )}
            </form>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Asignaturas</h2>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando asignaturas...</div>
            ) : (
              <table className={styles.activityTable}>
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
                      <tr key={a.id || idx}>
                        <td className={styles.activityUser}>{a.nombre}</td>
                        <td className={styles.activityAction}>{a.area}</td>
                        <td className={styles.activityAction}>{a.codigo}</td>
                        <td className={styles.activityAction}>{a.grado ? `${a.grado.nombre} ${a.grado.seccion}` : '-'}</td>
                        <td className={styles.activityAction}>{a.docente ? a.docente.name : '-'}</td>
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
