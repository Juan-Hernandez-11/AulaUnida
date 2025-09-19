"use client";

import React, { useState } from 'react';
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

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
};

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios', active: true },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', role: 'admin', firebaseUid: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; firebaseUid?: string }>({});

  // Obtener usuarios al cargar
  // Cargar usuarios manualmente cuando sea necesario (ejemplo: con un botón o tras crear/editar)

  // Manejar cambios en el formulario
  // Validación en tiempo real
  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (value.length < 3) error = 'Debe tener al menos 3 caracteres.';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'El correo es obligatorio.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) error = 'Correo inválido.';
    }
    if (name === 'firebaseUid' && !editingId) {
      if (!value.trim()) error = 'El UID de Firebase es obligatorio.';
      else if (value.length < 10) error = 'UID demasiado corto.';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Crear o editar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    // Validación global antes de enviar
    const newErrors: typeof fieldErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      firebaseUid: !editingId ? validateField('firebaseUid', form.firebaseUid) : undefined,
    };
    setFieldErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.firebaseUid) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/usuarios', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, name: form.name, email: form.email, role: form.role }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar usuario');
        } else {
          const updatedUser = await res.json();
          setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
          setForm({ name: '', email: '', role: 'admin', firebaseUid: '' });
          setEditingId(null);
        }
      } else {
        const res = await fetch('/api/admin/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear usuario');
        } else {
          const newUser = await res.json();
          setUsers(prev => [...prev, newUser]);
          setForm({ name: '', email: '', role: 'admin', firebaseUid: '' });
        }
      }
    } catch (err) {
      setError('Error de red');
    }
    setCreating(false);
  };

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      const res = await fetch('/api/admin/usuarios', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar usuario');
      } else {
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  // Editar usuario (cargar datos en el formulario)
  const handleEdit = (user: User) => {
    setForm({ name: user.name || '', email: user.email, role: user.role, firebaseUid: '' });
    setEditingId(user.id);
    setError('');
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
                  <NextLink href={link.href} className={`${styles.menuItem} ${link.active ? styles.menuItemActive : ''}`}>
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
          <h1 className={styles.title}>Gestión de Usuarios</h1>
          <div className={styles.activityCard}>
            <h2 className={styles.activityTitle}>{editingId ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <input
                    className="border p-2 rounded"
                    placeholder="Nombre completo"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={creating}
                    autoComplete="off"
                  />
                  {fieldErrors.name && <span className="text-red-500 text-xs mt-1">{fieldErrors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <input
                    className="border p-2 rounded"
                    placeholder="Correo electrónico"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={creating}
                    type="email"
                    autoComplete="off"
                  />
                  {fieldErrors.email && <span className="text-red-500 text-xs mt-1">{fieldErrors.email}</span>}
                </div>
                <select
                  className="border p-2 rounded"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={creating}
                >
                  <option value="admin">admin</option>
                  <option value="docente">docente</option>
                  <option value="estudiante">estudiante</option>
                </select>
                {!editingId && (
                  <div className="flex flex-col">
                    <input
                      className="border p-2 rounded"
                      placeholder="Firebase UID"
                      name="firebaseUid"
                      value={form.firebaseUid}
                      onChange={handleChange}
                      disabled={creating}
                      autoComplete="off"
                    />
                    {fieldErrors.firebaseUid && <span className="text-red-500 text-xs mt-1">{fieldErrors.firebaseUid}</span>}
                  </div>
                )}
              <div className="col-span-1 md:col-span-4 flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white rounded p-2 flex-1"
                  type="submit"
                  disabled={creating || !!fieldErrors.name || !!fieldErrors.email || (!editingId && !!fieldErrors.firebaseUid)}
                >
                  {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="bg-gray-400 text-white rounded p-2 flex-1"
                    onClick={() => { setEditingId(null); setForm({ name: '', email: '', role: 'admin', firebaseUid: '' }); setError(''); }}
                    disabled={creating}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
            {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
          </div>
          <div className={styles.activityCard} style={{ marginTop: 32 }}>
            <h2 className={styles.activityTitle}>Listado de Usuarios</h2>
            {loading ? (
              <div style={{ color: '#B0B3B8' }}>Cargando usuarios...</div>
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ color: '#B0B3B8' }}>(sin datos)</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id}>
                        <td className={styles.activityUser}>{user.name || '-'}</td>
                        <td className={styles.activityAction}>{user.email}</td>
                        <td className={styles.activityAction}>{user.role}</td>
                        <td className={styles.activityAction}>
                          <button
                            style={{ color: '#2563eb', textDecoration: 'underline', marginRight: 12 }}
                            onClick={() => handleEdit(user)}
                          >
                            Editar
                          </button>
                          <button
                            style={{ color: '#dc2626', textDecoration: 'underline' }}
                            onClick={() => handleDelete(user.id)}
                          >
                            Eliminar
                          </button>
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
