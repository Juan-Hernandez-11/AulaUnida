"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';

function BackToDashboardButton() {
  return (
    <div style={{ marginBottom: 24 }}>
      <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 500 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}

type Asignatura = {
  id: number;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  materias: { id: number; nombre: string; codigo: string; area: string }[];
};

type Materia = {
  id: number;
  nombre: string;
  codigo: string;
  area: string;
  asignaturaId?: number | null;
};

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

export default function AdminAsignaturaMaterialPage() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingAsignaturaId, setEditingAsignaturaId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ nombre: '', codigo: '', descripcion: '' });
  const [selectedMaterias, setSelectedMaterias] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Cargar asignaturas y materias al montar
  useEffect(() => {
    fetchAsignaturas();
    fetchMaterias();
  }, []);

  const fetchAsignaturas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/asignaturas');
      const data = await res.json();
      setAsignaturas(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterias = async () => {
    try {
      const res = await fetch('/api/docente/materias');
      const data = await res.json();
      setMaterias(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateAsignatura = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      const res = await fetch('/api/admin/asignaturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          codigo: formData.codigo || null,
          descripcion: formData.descripcion || null
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al crear asignatura');
        return;
      }

      const nuevaAsignatura = await res.json();

      // Asociar materias si hay seleccionadas
      if (selectedMaterias.length > 0) {
        await fetch(`/api/admin/asignaturas/${nuevaAsignatura.id}/materias`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ materiaIds: selectedMaterias })
        });
      }

      setSuccess('Asignatura creada exitosamente');
      setFormData({ nombre: '', codigo: '', descripcion: '' });
      setSelectedMaterias([]);
      setShowForm(false);
      fetchAsignaturas();
      fetchMaterias();
    } catch (err) {
      setError('Error de red');
      console.error(err);
    }
  };

  const handleUpdateAsignatura = async (asignaturaId: number) => {
    setError('');
    setSuccess('');

    try {
      await fetch(`/api/admin/asignaturas/${asignaturaId}/materias`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materiaIds: selectedMaterias })
      });

      setSuccess('Asignatura actualizada exitosamente');
      setEditingAsignaturaId(null);
      setFormData({ nombre: '', codigo: '', descripcion: '' });
      setSelectedMaterias([]);
      fetchAsignaturas();
      fetchMaterias();
    } catch (err) {
      setError('Error de red');
      console.error(err);
    }
  };

  const handleSelectMateria = (materiaId: number) => {
    if (selectedMaterias.includes(materiaId)) {
      setSelectedMaterias(selectedMaterias.filter(id => id !== materiaId));
    } else {
      setSelectedMaterias([...selectedMaterias, materiaId]);
    }
  };

  const handleEditAsignatura = (asignatura: Asignatura) => {
    setEditingAsignaturaId(asignatura.id);
    setFormData({
      nombre: asignatura.nombre,
      codigo: asignatura.codigo || '',
      descripcion: asignatura.descripcion || ''
    });
    setSelectedMaterias(asignatura.materias.map(m => m.id));
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setEditingAsignaturaId(null);
    setFormData({ nombre: '', codigo: '', descripcion: '' });
    setSelectedMaterias([]);
    setShowForm(false);
  };

  const getMaterialesNoAsignadas = () => {
    return materias.filter(m => !selectedMaterias.includes(m.id) && m.asignaturaId !== editingAsignaturaId);
  };

  const getMaterialesAsignadas = () => {
    return materias.filter(m => selectedMaterias.includes(m.id));
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
                  <NextLink href={link.href} className={`${styles.menuItem}`}>
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
          <h1 className={styles.title}>Agrupación de Materias en Asignaturas</h1>
          <p style={{ color: '#b0b3b8', marginBottom: 24 }}>
            Agrupa las materias relacionadas en asignaturas. Por ejemplo: Naturales, Química y Física → Ciencias Naturales
          </p>

          {/* Formulario */}
          {showForm && (
            <div className={styles.activityCard} style={{ marginBottom: 24 }}>
              <h2 style={{ fontWeight: 600, color: '#22c55e', marginBottom: 16 }}>
                {editingAsignaturaId ? 'Editar Asignatura' : 'Nueva Asignatura'}
              </h2>

              <form onSubmit={e => {
                e.preventDefault();
                if (editingAsignaturaId) {
                  handleUpdateAsignatura(editingAsignaturaId);
                } else {
                  handleCreateAsignatura(e);
                }
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#fff' }}>Nombre *</label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                      disabled={editingAsignaturaId !== null}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#181A1B',
                        color: '#fff',
                        border: '1.5px solid #232527',
                        borderRadius: 6,
                        fontSize: 14,
                        opacity: editingAsignaturaId ? 0.6 : 1
                      }}
                      placeholder="Ej: Ciencias Naturales"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#fff' }}>Código</label>
                    <input
                      type="text"
                      value={formData.codigo}
                      onChange={e => setFormData({ ...formData, codigo: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: '#181A1B',
                        color: '#fff',
                        border: '1.5px solid #232527',
                        borderRadius: 6,
                        fontSize: 14
                      }}
                      placeholder="Ej: CN"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#fff' }}>Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#181A1B',
                      color: '#fff',
                      border: '1.5px solid #232527',
                      borderRadius: 6,
                      fontSize: 14,
                      minHeight: 80,
                      fontFamily: 'inherit'
                    }}
                    placeholder="Descripción de la asignatura"
                  />
                </div>

                {/* Selector de Materias */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, color: '#22c55e' }}>
                    Materias que componen esta asignatura
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16
                  }}>
                    {/* Materias disponibles */}
                    <div>
                      <h4 style={{ fontSize: 12, color: '#b0b3b8', marginBottom: 8, textTransform: 'uppercase' }}>Disponibles</h4>
                      <div style={{
                        maxHeight: 350,
                        overflowY: 'auto',
                        padding: 12,
                        background: '#1a1c1e',
                        borderRadius: 8,
                        border: '1px solid #232527'
                      }}>
                        {getMaterialesNoAsignadas().length === 0 ? (
                          <div style={{ color: '#666', fontSize: 12 }}>Todas las materias están asignadas</div>
                        ) : (
                          getMaterialesNoAsignadas().map(materia => (
                            <button
                              key={materia.id}
                              type="button"
                              onClick={() => handleSelectMateria(materia.id)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 12px',
                                marginBottom: 6,
                                background: '#232527',
                                color: '#e5e7eb',
                                border: '1px solid #374151',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 500,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#22c55e';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.borderColor = '#22c55e';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = '#232527';
                                e.currentTarget.style.color = '#e5e7eb';
                                e.currentTarget.style.borderColor = '#374151';
                              }}
                            >
                              {materia.nombre}
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Materias seleccionadas */}
                    <div>
                      <h4 style={{ fontSize: 12, color: '#22c55e', marginBottom: 8, textTransform: 'uppercase' }}>Seleccionadas ({selectedMaterias.length})</h4>
                      <div style={{
                        maxHeight: 350,
                        overflowY: 'auto',
                        padding: 12,
                        background: '#0f3a2a',
                        borderRadius: 8,
                        border: '1px solid #22c55e'
                      }}>
                        {selectedMaterias.length === 0 ? (
                          <div style={{ color: '#666', fontSize: 12 }}>Selecciona materias de la izquierda</div>
                        ) : (
                          getMaterialesAsignadas().map(materia => (
                            <button
                              key={materia.id}
                              type="button"
                              onClick={() => handleSelectMateria(materia.id)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 12px',
                                marginBottom: 6,
                                background: '#22c55e',
                                color: '#000',
                                border: '1px solid #16a34a',
                                borderRadius: 4,
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 600,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.background = '#16a34a';
                                e.currentTarget.style.opacity = '0.8';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.background = '#22c55e';
                                e.currentTarget.style.opacity = '1';
                              }}
                            >
                              ✓ {materia.nombre}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {error && <div style={{ color: '#f87171', marginBottom: 16, padding: 12, background: '#7f1d1d', borderRadius: 6 }}>{error}</div>}
                {success && <div style={{ color: '#22c55e', marginBottom: 16, padding: 12, background: '#1a3a1a', borderRadius: 6 }}>{success}</div>}

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="submit"
                    style={{
                      background: 'var(--color-primary)',
                      color: '#fff',
                      padding: '10px 24px',
                      borderRadius: 6,
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {editingAsignaturaId ? 'Actualizar Asignatura' : 'Crear Asignatura'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={{
                      background: '#374151',
                      color: '#fff',
                      padding: '10px 24px',
                      borderRadius: 6,
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Botón para mostrar formulario */}
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingAsignaturaId(null);
                setFormData({ nombre: '', codigo: '', descripcion: '' });
                setSelectedMaterias([]);
              }}
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: 6,
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 24
              }}
            >
              + Nueva Asignatura
            </button>
          )}

          {/* Lista de Asignaturas */}
          <div className={styles.activityCard}>
            <h2 style={{ fontWeight: 600, color: '#22c55e', marginBottom: 16 }}>Asignaturas Registradas</h2>
            {loading ? (
              <div>Cargando...</div>
            ) : asignaturas.length === 0 ? (
              <div style={{ color: '#888' }}>No hay asignaturas registradas</div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {asignaturas.map(asignatura => (
                  <div
                    key={asignatura.id}
                    style={{
                      padding: 16,
                      background: '#1a1c1e',
                      borderRadius: 8,
                      border: '1px solid #232527'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: 600, color: '#22c55e', margin: 0 }}>{asignatura.nombre}</h3>
                        {asignatura.codigo && <div style={{ fontSize: 12, color: '#888' }}>Código: {asignatura.codigo}</div>}
                        {asignatura.descripcion && <div style={{ fontSize: 13, color: '#b0b3b8', marginTop: 6 }}>{asignatura.descripcion}</div>}
                      </div>
                      <button
                        onClick={() => handleEditAsignatura(asignatura)}
                        style={{
                          background: '#3b82f6',
                          color: '#fff',
                          padding: '6px 16px',
                          borderRadius: 4,
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 500,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Editar
                      </button>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#b0b3b8', marginBottom: 8, textTransform: 'uppercase' }}>
                        Materias ({asignatura.materias.length}):
                      </div>
                      {asignatura.materias.length === 0 ? (
                        <div style={{ fontSize: 12, color: '#666' }}>Sin materias asociadas</div>
                      ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {asignatura.materias.map(materia => (
                            <div
                              key={materia.id}
                              style={{
                                background: '#22c55e',
                                color: '#000',
                                padding: '6px 12px',
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 600
                              }}
                            >
                              {materia.nombre}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
