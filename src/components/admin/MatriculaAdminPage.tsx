"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import NextLink from '../NextLink';
import Button from '../ui/Button';
import TriangleIcon from '../icons/TriangleIcon';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface Grado {
  id: number;
  nombre: string;
  seccion: string;
}
interface Estudiante {
  id: number;
  name: string;
  email: string;
}

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula', active: true },
];

  function BackToDashboardButton() {
    return (
      <div className="mb-6">
        <NextLink href="/admin" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline">
          <TriangleIcon />
        Volver al Dashboard
        </NextLink>
      </div>
    );
  }

export default function MatriculaAdminPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [matriculados, setMatriculados] = useState<Estudiante[]>([]);
  const [gradoId, setGradoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ gradoId?: string; estudianteId?: string }>({});
  const [selectedEstudiante, setSelectedEstudiante] = useState('');

  // Cargar grados y estudiantes al montar
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/admin/grados').then(r => r.json()),
      fetch('/api/admin/usuarios').then(r => r.json()),
    ]).then(([grados, usuarios]) => {
      setGrados(grados);
      setEstudiantes(usuarios.filter((u: any) => u.role === 'STUDENT'));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Cargar estudiantes matriculados al seleccionar grado
  useEffect(() => {
    if (!gradoId) return;
    setLoading(true);
    fetch(`/api/admin/matricula?gradoId=${gradoId}`)
      .then(r => r.json())
      .then(data => {
        setMatriculados(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gradoId]);

  const handleGradoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setGradoId(value);
    setMatriculados([]);
    setError('');
    setFieldErrors(prev => ({ ...prev, gradoId: !value ? 'Debes seleccionar un grado.' : '' }));
  };

  const handleEstudianteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedEstudiante(value);
    setFieldErrors(prev => ({ ...prev, estudianteId: !value ? 'Debes seleccionar un estudiante.' : '' }));
  };

  const handleMatricular = async (estudianteId: number) => {
    if (!gradoId) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/matricula', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gradoId: Number(gradoId), estudianteId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al matricular');
      } else {
        const nuevo = await res.json();
        setMatriculados(prev => [...prev, nuevo]);
        setSuccess('Estudiante matriculado correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2500);
  };

  const handleEliminar = async (estudianteId: number) => {
    if (!gradoId) return;
    if (!window.confirm('¿Seguro que deseas eliminar la matrícula?')) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/matricula', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gradoId: Number(gradoId), estudianteId }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar matrícula');
      } else {
        setMatriculados(prev => prev.filter(e => e.id !== estudianteId));
        setSuccess('Matrícula eliminada correctamente.');
      }
    } catch {
      setError('Error de red');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2500);
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
          <BackToDashboardButton />
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Matrícula</h1>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            {error && <div className="bg-red-600 text-white p-3 rounded mb-4 font-medium">{error}</div>}
            {success && <div className="bg-green-600 text-white p-3 rounded mb-4 font-medium">{success}</div>}
            {loading && <div className="bg-gray-200 text-gray-700 p-2 rounded mb-4">Procesando...</div>}
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Selecciona un grado</h2>
            <select className="border p-2 rounded mb-4" value={gradoId} onChange={handleGradoChange}>
              <option value="">Selecciona grado</option>
              {grados.map(g => (
                <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>
              ))}
            </select>
            {gradoId && (
              <>
                <h3 className="font-bold mb-2">Estudiantes matriculados</h3>
                {loading ? (
                  <div className="text-gray-400">Cargando...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg mb-4">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Nombre</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Email</th>
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matriculados.length === 0 ? (
                          <tr><td colSpan={3} className="py-8 text-center text-gray-400">Sin estudiantes matriculados</td></tr>
                        ) : (
                          matriculados.map(e => (
                            <tr key={e.id} className="border-t border-gray-100 hover:bg-blue-50 transition-colors">
                              <td className="px-4 py-2 font-medium text-gray-800">{e.name}</td>
                              <td className="px-4 py-2 text-gray-700">{e.email}</td>
                              <td className="px-4 py-2">
                                <Button variant="ghost" onClick={() => handleEliminar(e.id)} className="text-red-600">Eliminar</Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                <h3 className="font-bold mt-6 mb-2">Agregar estudiante</h3>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col flex-1">
                    <select className="border p-2 rounded mr-2" id="add-estudiante" value={selectedEstudiante} onChange={handleEstudianteChange}>
                      <option value="">Selecciona estudiante</option>
                      {estudiantes.filter(e => !matriculados.some(m => m.id === e.id)).map(e => (
                        <option key={e.id} value={e.id}>{e.name} ({e.email})</option>
                      ))}
                    </select>
                    {fieldErrors.estudianteId && <span className="text-red-500 text-xs mt-1">{fieldErrors.estudianteId}</span>}
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (!selectedEstudiante) {
                        setFieldErrors(prev => ({ ...prev, estudianteId: 'Debes seleccionar un estudiante.' }));
                        return;
                      }
                      handleMatricular(Number(selectedEstudiante));
                      setSelectedEstudiante('');
                    }}
                    disabled={loading || !selectedEstudiante || !!fieldErrors.estudianteId}
                  >
                    Matricular
                  </Button>
                </div>
              </>
            )}
            {fieldErrors.gradoId && <div className="text-red-600 mt-2 font-medium">{fieldErrors.gradoId}</div>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
