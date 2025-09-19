"use client";

import React, { useState, ChangeEvent } from 'react';
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

// Tipos para grado y usuario
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

export default function AdminMatriculaPage() {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [matriculados, setMatriculados] = useState<Estudiante[]>([]);
  const [gradoId, setGradoId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Estado para errores de validación en tiempo real
  const [fieldErrors, setFieldErrors] = useState<{ gradoId?: string; estudianteId?: string }>({});
  const [selectedEstudiante, setSelectedEstudiante] = useState('');

  // Cargar datos manualmente cuando sea necesario (ejemplo: con un botón o tras crear/editar)

  // Maneja el cambio de grado seleccionado
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

  // Matricula un estudiante en el grado seleccionado
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

  // Elimina la matrícula de un estudiante en el grado seleccionado
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
          <h1 className={styles.title}>Gestión de Matrícula</h1>
          <div className={styles.activityCard}>
            {/* Feedback visual */}
            {error && <div style={{ background: '#dc2626', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 16, fontWeight: 500 }}>{error}</div>}
            {success && <div style={{ background: '#22c55e', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 16, fontWeight: 500 }}>{success}</div>}
            {loading && <div style={{ background: '#232527', color: '#B0B3B8', padding: 10, borderRadius: 8, marginBottom: 16 }}>Procesando...</div>}
            <h2 className={styles.activityTitle}>Selecciona un grado</h2>
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
                  <div style={{ color: '#B0B3B8' }}>Cargando...</div>
                ) : (
                  <table className={styles.activityTable}>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matriculados.length === 0 ? (
                        <tr><td colSpan={3} style={{ color: '#B0B3B8' }}>Sin estudiantes matriculados</td></tr>
                      ) : (
                        matriculados.map(e => (
                          <tr key={e.id}>
                            <td className={styles.activityUser}>{e.name}</td>
                            <td className={styles.activityAction}>{e.email}</td>
                            <td className={styles.activityAction}>
                              <button style={{ color: '#dc2626' }} onClick={() => handleEliminar(e.id)}>Eliminar</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
                <h3 className="font-bold mt-6 mb-2">Agregar estudiante</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="flex flex-col flex-1">
                    <select className="border p-2 rounded mr-2" id="add-estudiante" value={selectedEstudiante} onChange={handleEstudianteChange}>
                      <option value="">Selecciona estudiante</option>
                      {estudiantes.filter(e => !matriculados.some(m => m.id === e.id)).map(e => (
                        <option key={e.id} value={e.id}>{e.name} ({e.email})</option>
                      ))}
                    </select>
                    {fieldErrors.estudianteId && <span className="text-red-500 text-xs mt-1">{fieldErrors.estudianteId}</span>}
                  </div>
                  <button
                    className="bg-green-600 text-white rounded p-2"
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
                  </button>
                </div>
              </>
            )}
            {fieldErrors.gradoId && <div style={{ color: 'red', marginTop: 12 }}>{fieldErrors.gradoId}</div>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
