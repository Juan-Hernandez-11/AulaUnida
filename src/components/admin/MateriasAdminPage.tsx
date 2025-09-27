import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import NextLink from '../NextLink';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Materias', icon: BookOpenIcon, href: '/admin/materias', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

interface Grado { id: number; nombre: string; seccion: string; }
interface Materia {
  id: number;
  nombre: string;
  area: string;
  codigo: string;
  gradoId: number;
  grado?: Grado;
}

export default function MateriasAdminPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre: '', area: '', codigo: '', gradoId: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/materias').then(r => r.json()),
      fetch('/api/admin/grados').then(r => r.json()),
    ]).then(([materias, grados]) => {
      setMaterias(materias);
      setGrados(grados);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return 'Campo obligatorio';
    if (name === 'codigo' && value.length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
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
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      area: validateField('area', form.area),
      codigo: validateField('codigo', form.codigo),
      gradoId: validateField('gradoId', form.gradoId),
    };
    setFieldErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      if (editingId) {
        const res = await fetch('/api/admin/materias', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, id: editingId, gradoId: Number(form.gradoId) }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar materia');
        } else {
          const updated = await res.json();
          setMaterias(prev => prev.map(m => m.id === updated.id ? updated : m));
          setForm({ nombre: '', area: '', codigo: '', gradoId: '' });
          setEditingId(null);
        }
      } else {
        const res = await fetch('/api/admin/materias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, gradoId: Number(form.gradoId) }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear materia');
        } else {
          const nueva = await res.json();
          setMaterias(prev => [...prev, nueva]);
          setForm({ nombre: '', area: '', codigo: '', gradoId: '' });
        }
      }
    } catch {
      setError('Error de red');
    }
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta materia?')) return;
    try {
      const res = await fetch('/api/admin/materias', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar materia');
      } else {
        setMaterias(prev => prev.filter(m => m.id !== id));
      }
    } catch {
      setError('Error de red');
    }
  };

  const handleEdit = (materia: Materia) => {
    setForm({
      nombre: materia.nombre,
      area: materia.area,
      codigo: materia.codigo,
      gradoId: materia.gradoId.toString(),
    });
    setEditingId(materia.id);
    setError('');
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col p-6">
          <div className="flex items-center mb-12">
            <img src="/favicon.ico" alt="Admin" className="w-10 h-10 rounded-full mr-3" />
            <span className="font-bold text-lg text-blue-700">AulaUnida</span>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`flex items-center px-3 py-2 rounded transition-colors ${link.active ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-700'}`}>
                    <link.icon className="w-5 h-5 mr-3" />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Materias/Asignaturas</h1>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">{editingId ? 'Editar Materia' : 'Crear Materia'}</h2>
            <form className="flex flex-col md:flex-row gap-4 mb-4" onSubmit={handleSubmit}>
              <div className="flex flex-col flex-1">
                <input
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Nombre de la materia"
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
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Área"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.area && <span className="text-red-500 text-xs mt-1">{fieldErrors.area}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <input
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Código"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.codigo && <span className="text-red-500 text-xs mt-1">{fieldErrors.codigo}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <select
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="gradoId"
                  value={form.gradoId}
                  onChange={handleChange}
                  disabled={creating}
                >
                  <option value="">Selecciona un grado</option>
                  {grados.map(g => (
                    <option key={g.id} value={g.id}>{g.nombre} - {g.seccion}</option>
                  ))}
                </select>
                {fieldErrors.gradoId && <span className="text-red-500 text-xs mt-1">{fieldErrors.gradoId}</span>}
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-semibold transition-colors disabled:opacity-60" type="submit" disabled={creating || Object.values(fieldErrors).some(Boolean)}>
                  {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
                </button>
                {editingId && (
                  <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white rounded px-4 py-2 font-semibold transition-colors" onClick={() => { setEditingId(null); setForm({ nombre: '', area: '', codigo: '', gradoId: '' }); setError(''); }} disabled={creating}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
            {error && <div className="text-red-600 mb-2 font-medium">{error}</div>}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Listado de Materias/Asignaturas</h2>
            {loading ? (
              <div className="py-8 text-center text-gray-400">Cargando materias...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Nombre</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Área</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Código</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Grado</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materias.length === 0 ? (
                      <tr><td colSpan={5} className="py-8 text-center text-gray-400">Sin materias registradas</td></tr>
                    ) : (
                      materias.map((m, idx) => (
                        <tr key={m.id || idx} className="border-t border-gray-100 hover:bg-blue-50 transition-colors">
                          <td className="px-4 py-2 font-medium text-gray-800">{m.nombre}</td>
                          <td className="px-4 py-2 text-gray-700">{m.area}</td>
                          <td className="px-4 py-2 text-gray-700">{m.codigo}</td>
                          <td className="px-4 py-2 text-gray-700">{grados.find(g => g.id === m.gradoId)?.nombre} - {grados.find(g => g.id === m.gradoId)?.seccion}</td>
                          <td className="px-4 py-2">
                            <button className="text-blue-600 hover:underline mr-4 font-medium" onClick={() => handleEdit(m)}>Editar</button>
                            <button className="text-red-600 hover:underline font-medium" onClick={() => handleDelete(m.id)}>Eliminar</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
