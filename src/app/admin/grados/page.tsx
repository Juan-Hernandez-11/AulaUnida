"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';
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

// Tipo para grado (se mantiene igual)
type Grado = {
  id: number;
  nombre: string;
  seccion: string;
};

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
  const [form, setForm] = useState({ nombre: '', seccion: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ nombre?: string; seccion?: string }>({});

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/grados')
      .then(res => res.json())
      .then(data => {
        setGrados(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Validación en tiempo real
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre del grado es obligatorio.';
      else if (value.length < 2) error = 'Debe tener al menos 2 caracteres.';
    }
    if (name === 'seccion') {
      if (!value.trim()) error = 'La sección es obligatoria.';
      else if (value.length < 1) error = 'Debe tener al menos 1 caracter.';
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
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      seccion: validateField('seccion', form.seccion),
    };
    setFieldErrors(newErrors);
    if (newErrors.nombre || newErrors.seccion) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        // Editar grado
        const res = await fetch('/api/admin/grados', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar grado');
        } else {
          const updated = await res.json();
          setGrados(prev => prev.map(g => g.id === updated.id ? updated : g));
          setForm({ nombre: '', seccion: '' });
          setEditingId(null);
        }
      } else {
        // Crear grado
        const res = await fetch('/api/admin/grados', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear grado');
        } else {
          const nuevo = await res.json();
          setGrados(prev => [...prev, nuevo]);
          setForm({ nombre: '', seccion: '' });
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este grado?')) return;
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
      }
    } catch {
      setError('Error de red');
    }
  };

  const handleEdit = (grado: Grado) => {
    setForm({ nombre: grado.nombre, seccion: grado.seccion });
    setEditingId(grado.id);
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
          <h1 className={styles.title}>Gestión de Grados y Secciones</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Grado' : 'Crear Grado'}</h2>
            {/* Formulario de creación/edición de grado */}
            <form style={{ display: 'flex', gap: 16, marginBottom: 24 }} onSubmit={handleSubmit}>
              <div className="flex flex-col flex-1">
                <input
                  className="border p-2 rounded"
                  placeholder="Nombre del grado"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.nombre && <span className="text-red-500 text-xs mt-1">{fieldErrors.nombre}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <input
                  className="border p-2 rounded"
                  placeholder="Sección"
                  name="seccion"
                  value={form.seccion}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.seccion && <span className="text-red-500 text-xs mt-1">{fieldErrors.seccion}</span>}
              </div>
              <button className="bg-blue-500 text-white rounded p-2" type="submit" disabled={creating || !!fieldErrors.nombre || !!fieldErrors.seccion}>
                {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
              </button>
              {editingId && (
                <button type="button" className="bg-gray-400 text-white rounded p-2" onClick={() => { setEditingId(null); setForm({ nombre: '', seccion: '' }); setError(''); }} disabled={creating}>
                  Cancelar
                </button>
              )}
            </form>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          </div>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>Listado de Grados y Secciones</h2>
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Cargando grados...</div>
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
                    <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#B0B3B8' }}>Sin grados registrados</td></tr>
                  ) : (
                    grados.map((g, idx) => (
                      <tr key={g.id || idx}>
                        <td className={styles.activityUser}>{g.nombre}</td>
                        <td className={styles.activityAction}>{g.seccion}</td>
                        <td className={styles.activityAction}>
                          <button style={{ color: '#2563eb', marginRight: 8 }} onClick={() => handleEdit(g)}>Editar</button>
                          <button style={{ color: '#dc2626' }} onClick={() => handleDelete(g.id)}>Eliminar</button>
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
