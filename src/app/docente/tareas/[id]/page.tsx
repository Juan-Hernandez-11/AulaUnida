'use client';
import { useAuth } from '@/context/authContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/admin-dashboard.module.css';

const COLORS = {
  primary: '#10b981',
  secondary: '#06b6d4',
  accent: '#f59e0b',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  bg: '#0f0f0f',
  surface: '#1b1b1b',
  text: '#ffffff',
  textMuted: '#9ca3af',
};

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string | null;
  horaEntrega: string | null;
  materia: { nombre: string };
  createdAt: string;
}

interface Entrega {
  id: number;
  estudianteId: number;
  estudiante: { id: number; name: string; email: string };
  archivoUrl?: string;
  texto?: string;
  entregadaAt: string;
  estado: string;
  calificacion?: {
    id: number;
    valor: number;
    retroalimentacion?: string;
  };
}

interface Estudiante {
  id: number;
  name: string;
  email: string;
  entrega?: Entrega;
}

interface ModalData {
  entregaId: number;
  estudiante: string;
  calificacion: number;
  retroalimentacion: string;
}

export default function VerEntregasPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const tareaId = params.id as string;

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEntregaOpen, setModalEntregaOpen] = useState(false);
  const [entregaSeleccionada, setEntregaSeleccionada] = useState<Entrega | null>(null);
  const [modalData, setModalData] = useState<ModalData>({
    entregaId: 0,
    estudiante: '',
    calificacion: 0,
    retroalimentacion: '',
  });

  useEffect(() => {
    if (!user || !tareaId) return;
    loadTareaAndEntregas();
  }, [user, tareaId]);

  const loadTareaAndEntregas = async () => {
    try {
      setLoading(true);
      const idToken = await user?.getIdToken();
      let tareaEncontrada: any = null;
      let entregasData: any[] = [];
      
      // Cargar tarea y entregas
      const response = await fetch(`/api/docente/tareas?tareaId=${tareaId}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        const tareasEncontradas = data.tareas || [];
        tareaEncontrada = tareasEncontradas.find((t: any) => t.id === parseInt(tareaId));
        
        if (tareaEncontrada) {
          entregasData = tareaEncontrada.entregas || [];
          setTarea(tareaEncontrada);
          setEntregas(entregasData);
        } else {
          setError('Tarea no encontrada');
        }
      } else {
        setError('Error al cargar tarea');
      }

      // Cargar estudiantes del grado
      if (tareaEncontrada) {
        const responseEstudiantes = await fetch(`/api/docente/tareas/${tareaId}/estudiantes`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (responseEstudiantes.ok) {
          const dataEst = await responseEstudiantes.json();
          const entregasMap = new Map(
            entregasData.map((e: any) => [e.estudianteId, e])
          );
          
          const estudiantesConEntrega = (dataEst.estudiantes || []).map((est: any) => ({
            ...est,
            entrega: entregasMap.get(est.id),
          }));
          
          setEstudiantes(estudiantesConEntrega);
        }
      }
    } catch (err) {
      console.error('Error cargando tarea:', err);
      setError('Error al cargar tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleCalificar = (entrega: Entrega) => {
    setModalData({
      entregaId: entrega.id,
      estudiante: entrega.estudiante.name,
      calificacion: entrega.calificacion?.valor || 0,
      retroalimentacion: entrega.calificacion?.retroalimentacion || '',
    });
    setModalOpen(true);
  };

  const handleVerEntrega = (entrega: Entrega) => {
    setEntregaSeleccionada(entrega);
    setModalEntregaOpen(true);
  };

  const handleGuardarCalificacion = async () => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`/api/docente/entregas/calificar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entregaId: modalData.entregaId,
          calificacion: parseFloat(String(modalData.calificacion)),
          retroalimentacion: modalData.retroalimentacion,
        }),
      });

      if (response.ok) {
        setModalOpen(false);
        await loadTareaAndEntregas();
      } else {
        setError('Error al guardar calificación');
      }
    } catch (err) {
      console.error('Error guardando calificación:', err);
      setError('Error al guardar calificación');
    }
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <main className={styles.mainContent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: COLORS.textMuted, fontSize: '1.125rem' }}>⏳ Cargando...</div>
        </main>
      </div>
    );
  }

  if (!tarea) {
    return (
      <div className={styles.dashboardContainer}>
        <main className={styles.mainContent} style={{ padding: '2rem' }}>
          <button
            onClick={() => router.back()}
            style={{
              padding: '8px 16px',
              backgroundColor: COLORS.primary,
              color: COLORS.bg,
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <ArrowLeftIcon style={{ width: 20, height: 20 }} />
            Volver
          </button>
          <div style={{ color: COLORS.danger }}>❌ {error || 'Tarea no encontrada'}</div>
        </main>
      </div>
    );
  }

  const entregadas = entregas.filter((e) => e.estado === 'entregada').length;
  const noEntregadas = estudiantes.length - entregadas;
  const conCalificacion = entregas.filter((e) => e.calificacion).length;

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.mainContent} style={{ padding: '2rem' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          style={{
            padding: '8px 16px',
            backgroundColor: COLORS.primary,
            color: COLORS.bg,
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ArrowLeftIcon style={{ width: 20, height: 20 }} />
          Volver a Tareas
        </button>

        {/* Task Header */}
        <div
          style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.primary}20`,
            padding: '2rem',
            borderRadius: '0.75rem',
            marginBottom: '2rem',
          }}
        >
          <h1 style={{ margin: 0, color: COLORS.text, marginBottom: '0.5rem', fontSize: '2rem' }}>
            {tarea.titulo}
          </h1>
          <p style={{ margin: '0.5rem 0 1.5rem 0', color: COLORS.textMuted }}>
            {tarea.descripcion}
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                backgroundColor: `${COLORS.success}20`,
                border: `1px solid ${COLORS.success}`,
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.success }}>
                {entregadas}
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textMuted }}>
                Entregadas
              </div>
            </div>

            <div
              style={{
                backgroundColor: `${COLORS.warning}20`,
                border: `1px solid ${COLORS.warning}`,
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.warning }}>
                {noEntregadas}
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textMuted }}>
                Pendientes
              </div>
            </div>

            <div
              style={{
                backgroundColor: `${COLORS.secondary}20`,
                border: `1px solid ${COLORS.secondary}`,
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.secondary }}>
                {conCalificacion}
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textMuted }}>
                Calificadas
              </div>
            </div>

            <div
              style={{
                backgroundColor: `${COLORS.accent}20`,
                border: `1px solid ${COLORS.accent}`,
                padding: '1rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 700, color: COLORS.accent }}>
                {estudiantes.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: COLORS.textMuted }}>
                Total Estudiantes
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                📅 Fecha de Entrega
              </p>
              <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, fontSize: '1rem', fontWeight: 600 }}>
                {tarea.fechaEntrega
                  ? new Date(tarea.fechaEntrega).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'No definida'}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                ⏰ Hora de Entrega
              </p>
              <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, fontSize: '1rem', fontWeight: 600 }}>
                {tarea.horaEntrega || 'No definida'}
              </p>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: `${COLORS.danger}20`,
              border: `1px solid ${COLORS.danger}`,
              color: COLORS.danger,
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Students List */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ color: COLORS.text, marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            📋 Entregas de Estudiantes
          </h2>

          {estudiantes.length === 0 ? (
            <div
              style={{
                backgroundColor: COLORS.surface,
                border: `1px dashed ${COLORS.textMuted}`,
                padding: '2rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                color: COLORS.textMuted,
              }}
            >
              Sin estudiantes inscritos en este grado
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {estudiantes.map((estudiante) => (
                <div
                  key={estudiante.id}
                  style={{
                    backgroundColor: COLORS.surface,
                    border: `1px solid ${COLORS.primary}20`,
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    cursor: estudiante.entrega ? 'pointer' : 'default',
                    opacity: estudiante.entrega ? 1 : 0.7,
                  }}
                  onMouseEnter={(e) => {
                    if (estudiante.entrega) {
                      e.currentTarget.style.backgroundColor = `${COLORS.primary}10`;
                      e.currentTarget.style.borderColor = `${COLORS.primary}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = COLORS.surface;
                    e.currentTarget.style.borderColor = `${COLORS.primary}20`;
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {/* Avatar */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          backgroundColor: estudiante.entrega ? COLORS.success : COLORS.danger,
                          color: COLORS.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.25rem',
                        }}
                      >
                        {estudiante.entrega ? '✓' : '✗'}
                      </div>
                      <div>
                        <p style={{ margin: 0, color: COLORS.text, fontWeight: 600 }}>
                          {estudiante.name}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: COLORS.textMuted, fontSize: '0.875rem' }}>
                          {estudiante.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {estudiante.entrega ? (
                      <>
                        <div style={{ marginBottom: '0.75rem' }}>
                          <p style={{ margin: 0, color: COLORS.success, fontWeight: 600, fontSize: '0.95rem' }}>
                            ✓ Entregado
                          </p>
                          <p style={{ margin: '0.25rem 0 0 0', color: COLORS.textMuted, fontSize: '0.8rem' }}>
                            {new Date(estudiante.entrega.entregadaAt).toLocaleDateString('es-ES')}
                          </p>
                          {estudiante.entrega.calificacion && (
                            <p style={{ margin: '0.25rem 0 0 0', color: COLORS.secondary, fontSize: '0.85rem', fontWeight: 600 }}>
                              ⭐ {estudiante.entrega.calificacion.valor}/5.0
                            </p>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleVerEntrega(estudiante.entrega!)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: COLORS.secondary,
                              color: COLORS.bg,
                              border: 'none',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              transition: 'all 0.3s ease',
                              flex: 1,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            👁️ Ver
                          </button>
                          <button
                            onClick={() => handleCalificar(estudiante.entrega!)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: estudiante.entrega.calificacion ? COLORS.secondary : COLORS.accent,
                              color: COLORS.bg,
                              border: 'none',
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              transition: 'all 0.3s ease',
                              flex: 1,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            {estudiante.entrega.calificacion ? '✏️ Editar' : '⭐ Calificar'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p style={{ margin: 0, color: COLORS.danger, fontWeight: 600, fontSize: '0.95rem' }}>
                          ✗ Pendiente
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: COLORS.textMuted, fontSize: '0.8rem' }}>
                          Sin entregar
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Grading Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.primary}20`,
              padding: '2rem',
              borderRadius: '0.75rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <h2 style={{ marginTop: 0, color: COLORS.text, marginBottom: '1.5rem' }}>
              ⭐ Calificar a {modalData.estudiante}
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                Calificación (0 - 5.0) *
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={modalData.calificacion}
                onChange={(e) => setModalData({ ...modalData, calificacion: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.primary}40`,
                  borderRadius: '0.5rem',
                  background: COLORS.bg,
                  color: COLORS.text,
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', color: COLORS.text, fontWeight: 600 }}>
                Retroalimentación (opcional)
              </label>
              <textarea
                value={modalData.retroalimentacion}
                onChange={(e) => setModalData({ ...modalData, retroalimentacion: e.target.value })}
                placeholder="Escribe tu feedback para el estudiante..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${COLORS.primary}40`,
                  borderRadius: '0.5rem',
                  background: COLORS.bg,
                  color: COLORS.text,
                  fontSize: '1rem',
                  minHeight: '150px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: COLORS.textMuted,
                  color: COLORS.bg,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCalificacion}
                style={{
                  padding: '12px 24px',
                  backgroundColor: COLORS.primary,
                  color: COLORS.bg,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✅ Guardar Calificación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Submission Modal */}
      {modalEntregaOpen && entregaSeleccionada && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.primary}20`,
              padding: '2rem',
              borderRadius: '0.75rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: COLORS.text }}>
                📬 Entrega de {entregaSeleccionada.estudiante.name}
              </h2>
              <button
                onClick={() => setModalEntregaOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: COLORS.textMuted,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Submission Date */}
            <div
              style={{
                backgroundColor: `${COLORS.success}20`,
                border: `1px solid ${COLORS.success}`,
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                📅 Fecha de Entrega
              </p>
              <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, fontSize: '1rem', fontWeight: 600 }}>
                {new Date(entregaSeleccionada.entregadaAt).toLocaleString('es-ES')}
              </p>
            </div>

            {/* Grade Display */}
            {entregaSeleccionada.calificacion && (
              <div
                style={{
                  backgroundColor: `${COLORS.secondary}20`,
                  border: `1px solid ${COLORS.secondary}`,
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                  ⭐ Calificación
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, fontSize: '1.25rem', fontWeight: 700 }}>
                  {entregaSeleccionada.calificacion.valor} / 5.0
                </p>
              </div>
            )}

            {/* Description/Message */}
            {entregaSeleccionada.texto && (
              <div
                style={{
                  backgroundColor: `${COLORS.primary}10`,
                  border: `1px solid ${COLORS.primary}40`,
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                  📝 Mensaje del Estudiante
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {entregaSeleccionada.texto}
                </p>
              </div>
            )}

            {/* Feedback */}
            {entregaSeleccionada.calificacion?.retroalimentacion && (
              <div
                style={{
                  backgroundColor: `${COLORS.accent}10`,
                  border: `1px solid ${COLORS.accent}40`,
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                  💬 Retroalimentación
                </p>
                <p style={{ margin: '0.5rem 0 0 0', color: COLORS.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {entregaSeleccionada.calificacion.retroalimentacion}
                </p>
              </div>
            )}

            {/* File Download */}
            {entregaSeleccionada.archivoUrl && (
              <div
                style={{
                  backgroundColor: `${COLORS.warning}10`,
                  border: `1px solid ${COLORS.warning}40`,
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '0.875rem' }}>
                  📎 Archivo Adjunto
                </p>
                <a
                  href={entregaSeleccionada.archivoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '0.75rem',
                    padding: '8px 16px',
                    backgroundColor: COLORS.warning,
                    color: COLORS.bg,
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ⬇️ Descargar Archivo
                </a>
              </div>
            )}

            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => setModalEntregaOpen(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: COLORS.primary,
                  color: COLORS.bg,
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✅ Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
