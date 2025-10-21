import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Loading from '../ui/Loading';
import LoadingModal from '../ui/LoadingModal';
import ProtectedRoute from '../ProtectedRoute';
import NextLink from '../NextLink';
import Button from '../ui/Button';
import TriangleIcon from '../icons/TriangleIcon';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Materias', icon: BookOpenIcon, href: '/admin/materias', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

interface Grado { id: number; nombre: string; seccion: string; }
interface Docente { id: number; name: string }

interface Materia {
  id: number;
  nombre: string;
  area: string;
  codigo: string;
  gradoId?: number;
  grado?: Grado;
  materiaGrados?: { grado: Grado; docentes?: Docente[] }[];
}

export default function MateriasAdminPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [grados, setGrados] = useState<Grado[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre: '', area: '', codigo: '', gradoIds: [] as string[], asignaciones: [] as { gradoId: number; docenteId: number }[] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/materias').then(r => r.json()),
      fetch('/api/admin/grados').then(r => r.json()),
      fetch('/api/admin/docentes').then(r => r.json()),
    ]).then(([materias, grados, docentes]) => {
      setMaterias(materias);
      setGrados(grados);
      if (Array.isArray(docentes)) setDocentes(docentes);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return 'Campo obligatorio';
    if (name === 'codigo' && value.length < 2) return 'Debe tener al menos 2 caracteres';
    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, multiple, options } = e.target as HTMLSelectElement;
    if (multiple) {
      const values = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm({ ...form, [name]: values });
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, values.join(',')) }));
    } else {
      setForm({ ...form, [name]: value });
      setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    const newErrors: typeof fieldErrors = {
      nombre: validateField('nombre', form.nombre),
      area: validateField('area', form.area),
      codigo: validateField('codigo', form.codigo),
      gradoIds: validateField('gradoIds', (form as any).gradoIds ? (form as any).gradoIds.join(',') : ''),
    };
    setFieldErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setError('Por favor corrige los errores antes de guardar.');
      setCreating(false);
      return;
    }
    try {
      const payloadBase = {
        nombre: form.nombre,
        area: form.area,
        codigo: form.codigo,
        gradoIds: (form as any).gradoIds ? (form as any).gradoIds.map((g: string) => Number(g)) : [] as number[],
        asignaciones: (form as any).asignaciones || [],
      };
      if (editingId) {
        const res = await fetch('/api/admin/materias', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...payloadBase }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al editar materia');
        } else {
          const updated = await res.json();
          setMaterias(prev => prev.map(m => m.id === updated.id ? updated : m));
          setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] });
          setEditingId(null);
        }
      } else {
        const res = await fetch('/api/admin/materias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadBase),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || 'Error al crear materia');
        } else {
          const nueva = await res.json();
          setMaterias(prev => [...prev, nueva]);
          setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] });
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
    const gradoIds = (materia.materiaGrados || []).map(mg => String(mg.grado.id));
    const asignaciones = (materia.materiaGrados || [])
      .filter(mg => Array.isArray(mg.docentes) && mg.docentes.length > 0)
      .map(mg => ({ gradoId: mg.grado.id, docenteId: (mg.docentes as any)[0].id }));
    setForm({
      nombre: materia.nombre,
      area: materia.area,
      codigo: materia.codigo,
      gradoIds,
      asignaciones,
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
                  value={(form as any).nombre}
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
                  value={(form as any).area}
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
                  value={(form as any).codigo}
                  onChange={handleChange}
                  disabled={creating}
                  autoComplete="off"
                />
                {fieldErrors.codigo && <span className="text-red-500 text-xs mt-1">{fieldErrors.codigo}</span>}
              </div>
              <div className="flex flex-col flex-1">
                <label className="sr-only">Grados</label>
                <select
                  id="gradoIds"
                  multiple
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="gradoIds"
                  value={(form as any).gradoIds}
                  onChange={handleChange}
                  disabled={creating}
                >
                  {grados.map(g => (
                    <option key={g.id} value={g.id}>{g.nombre} - {g.seccion}</option>
                  ))}
                </select>
                {fieldErrors.gradoIds && <span className="text-red-500 text-xs mt-1">{fieldErrors.gradoIds}</span>}
              </div>

              {/* Docente por grado */}
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-gray-700">Docente por grado</label>
                {(form as any).gradoIds.length === 0 ? (
                  <div style={{ color: '#888', fontSize: 14 }}>Selecciona al menos un grado</div>
                ) : (
                  (form as any).gradoIds.map((gradoId: string) => (
                    <div key={gradoId} style={{ marginBottom: 8 }}>
                      <span style={{ fontWeight: 500 }}>{grados.find(g => String(g.id) === gradoId)?.nombre} {grados.find(g => String(g.id) === gradoId)?.seccion}</span>
                      <select
                        className="border border-gray-300 p-2 rounded ml-2"
                        value={(form as any).asignaciones.find((a: any) => a.gradoId === Number(gradoId))?.docenteId || ''}
                        onChange={e => {
                          const docenteId = e.target.value;
                          setForm(prev => {
                            const asignaciones = prev.asignaciones.filter(a => a.gradoId !== Number(gradoId));
                            if (docenteId) asignaciones.push({ gradoId: Number(gradoId), docenteId: Number(docenteId) });
                            return { ...prev, asignaciones };
                          });
                        }}
                        disabled={creating}
                      >
                        <option value="">Sin docente asignado</option>
                        {docentes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col gap-2 justify-end mt-4">
                <Button variant="primary" type="submit" disabled={creating || Object.values(fieldErrors).some(Boolean)}>
                  {creating ? (editingId ? 'Guardando...' : 'Guardando...') : (editingId ? 'Guardar cambios' : 'Guardar')}
                </Button>
                {editingId && (
                  <Button variant="ghost" type="button" onClick={() => { setEditingId(null); setForm({ nombre: '', area: '', codigo: '', gradoIds: [], asignaciones: [] }); setError(''); }} disabled={creating}>
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
            {error && <div className="text-red-600 mb-2 font-medium">{error}</div>}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Listado de Materias/Asignaturas</h2>
            {loading ? (
              <LoadingModal open={true} message="Cargando materias..." />
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
                            <Button variant="ghost" onClick={() => handleEdit(m)} className="mr-4">Editar</Button>
                            <Button variant="ghost" onClick={() => handleDelete(m.id)} className="text-red-600">Eliminar</Button>
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
