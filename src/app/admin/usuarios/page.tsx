import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
};

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', role: 'admin', firebaseUid: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // Obtener usuarios al cargar
  useEffect(() => {
    fetch('/api/admin/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o editar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    // Validación básica
    if (!form.name || !form.email || !form.role || (!editingId && !form.firebaseUid)) {
      setError('Todos los campos son obligatorios.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        // Editar usuario
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
        // Crear usuario
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
    <ProtectedRoute allowedRoles={["admin"]}>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">{editingId ? 'Editar Usuario' : 'Crear Usuario'}</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
            <input
              className="border p-2 rounded"
              placeholder="Nombre completo"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={creating}
            />
            <input
              className="border p-2 rounded"
              placeholder="Correo electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={creating}
              type="email"
            />
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
              <input
                className="border p-2 rounded"
                placeholder="Firebase UID"
                name="firebaseUid"
                value={form.firebaseUid}
                onChange={handleChange}
                disabled={creating}
              />
            )}
            <div className="col-span-1 md:col-span-4 flex gap-2 mt-2">
              <button
                className="bg-blue-500 text-white rounded p-2 flex-1"
                type="submit"
                disabled={creating}
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
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Listado de Usuarios</h2>
          {loading ? (
            <div>Cargando usuarios...</div>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr>
                  <th className="border-b p-2">Nombre</th>
                  <th className="border-b p-2">Correo</th>
                  <th className="border-b p-2">Rol</th>
                  <th className="border-b p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td className="border-b p-2" colSpan={4}>(sin datos)</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id}>
                      <td className="border-b p-2">{user.name || '-'}</td>
                      <td className="border-b p-2">{user.email}</td>
                      <td className="border-b p-2">{user.role}</td>
                      <td className="border-b p-2">
                        <button
                          className="text-blue-600 underline mr-2"
                          onClick={() => handleEdit(user)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-600 underline"
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
    </ProtectedRoute>
  );
}
