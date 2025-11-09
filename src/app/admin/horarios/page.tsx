"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ProtectedRoute from '../../../components/ProtectedRoute';
import styles from '../../../styles/admin-dashboard.module.css';
import horarioStyles from '../../../styles/admin-horarios.module.css';
import NextLink from '../../../components/NextLink';
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, CalendarIcon } from '@heroicons/react/24/outline';

const sidebarLinks = [
  { label: 'Gestión de Usuarios', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Horarios', icon: CalendarIcon, href: '/admin/horarios', active: true },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const HORAS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function AdminHorariosPage() {
  const [ciclos, setCiclos] = useState<any[]>([]);
  const [grados, setGrados] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [selectedCiclo, setSelectedCiclo] = useState<number|null>(null);
  const [selectedGrado, setSelectedGrado] = useState<number|null>(null);
  const [horario, setHorario] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragMateria, setDragMateria] = useState<any|null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showAsignarMenu, setShowAsignarMenu] = useState(false);
  const [pendingMateria, setPendingMateria] = useState<any|null>(null);
  const [selectedDia, setSelectedDia] = useState(DIAS[0]);
  const [selectedHora, setSelectedHora] = useState(HORAS[0]);
  const [selectedDuracion, setSelectedDuracion] = useState(1);

  // Cargar ciclos y grados al inicio
  useEffect(() => {
    fetch('/api/admin/ciclos').then(r => r.json()).then(setCiclos);
    fetch('/api/admin/grados').then(r => r.json()).then(setGrados);
  }, []);

  // Cargar materias asignadas al grado
  useEffect(() => {
    if (selectedGrado) {
      fetch('/api/admin/asignaturas')
        .then(r => r.json())
        .then(data => {
          // Filtrar materias asignadas a este grado
          const mats: any[] = [];
          data.forEach((m: any) => {
            if (m.grados.some((g: any) => g.id === selectedGrado)) {
              mats.push(m);
            }
          });
          setMaterias(mats);
        });
    } else {
      setMaterias([]);
    }
  }, [selectedGrado]);

  // Cargar horario actual
  useEffect(() => {
    if (selectedGrado && selectedCiclo) {
      setLoading(true);
      fetch(`/api/admin/horarios?gradoId=${selectedGrado}&cicloId=${selectedCiclo}`)
        .then(r => r.json())
        .then(data => {
          console.log('Horarios cargados:', data); // Debug temporal
          setHorario(data);
        })
        .finally(() => setLoading(false));
    } else {
      setHorario([]);
    }
  }, [selectedGrado, selectedCiclo]);

  // Drag & Drop nativo
  const onDragStart = (materia: any) => setDragMateria(materia);
  const onDragEnd = () => setDragMateria(null);

  // Al soltar, mostrar menú de duración
  const onDropCell = () => {
    if (!dragMateria || !selectedGrado || !selectedCiclo) return;
    setPendingMateria(dragMateria);
    setSelectedDia(DIAS[0]);
    setSelectedHora(HORAS[0]);
    setSelectedDuracion(1);
    setShowAsignarMenu(true);
  };

  // Confirmar duración y guardar bloque
  const handleConfirmAsignar = async () => {
    if (!pendingMateria || !selectedGrado || !selectedCiclo) return;
    setSaving(true);
    setError('');
    const diaDb = selectedDia.toUpperCase();
    const idx = HORAS.indexOf(selectedHora);
    const horaFin = HORAS[idx + selectedDuracion] || HORAS[HORAS.length - 1];
    // Buscar el docente asignado correctamente
    let docenteId: number | null = null;
    const gradoAsignado = pendingMateria.grados.find((g: any) => g.id === selectedGrado);
    if (gradoAsignado && gradoAsignado.docentes && gradoAsignado.docentes.length > 0) {
      docenteId = gradoAsignado.docentes[0].id;
    }
    if (!docenteId) {
      setError('No hay docente asignado a esta materia para este grado.');
      setSaving(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gradoId: selectedGrado,
          cicloId: selectedCiclo,
          materiaId: pendingMateria.id,
          docenteId,
          dia: diaDb,
          horaInicio: selectedHora,
          horaFin,
        })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al guardar horario');
      } else {
        // Actualizar la grilla inmediatamente
        const nuevo = await res.json();
        setHorario(prev => [...prev, nuevo]);
        // Log visual para depuración
        console.log('Bloque guardado:', nuevo);
      }
    } catch {
      setError('Error de red');
    }
    setSaving(false);
    setDragMateria(null);
    setShowAsignarMenu(false);
    setPendingMateria(null);
  };

  // Cancelar menú de duración
  const handleCancelAsignar = () => {
    setShowAsignarMenu(false);
    setPendingMateria(null);
    setDragMateria(null);
  };

  const removeHorario = async (id: number) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/horarios?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Error al eliminar bloque');
      } else {
        setHorario(horario.filter((h: any) => h.id !== id));
      }
    } catch {
      setError('Error de red');
    }
    setSaving(false);
  };


  // Para saber si una celda ya está ocupada por un bloque largo
  function isCellStart(dia: string, hora: string) {
    return horario.some((h: any) => h.dia === dia && h.horaInicio === hora);
  }
  function getCellBlock(dia: string, hora: string) {
    return horario.find((h: any) => h.dia?.toUpperCase() === dia.toUpperCase() && h.horaInicio === hora);
  }
  function getBlockRowSpan(bloque: any) {
    const idxIni = HORAS.indexOf(bloque.horaInicio);
    const idxFin = HORAS.indexOf(bloque.horaFin);
    return Math.max(1, idxFin - idxIni);
  }
  function isCellCovered(dia: string, hora: string) {
    // ¿Esta celda está cubierta por un bloque que empezó antes?
    return horario.some((h: any) => {
      if (h.dia?.toUpperCase() !== dia.toUpperCase()) return false;
      const idxIni = HORAS.indexOf(h.horaInicio);
      const idxFin = HORAS.indexOf(h.horaFin);
      const idx = HORAS.indexOf(hora);
      return idx > idxIni && idx < idxFin;
    });
  }

  // Render
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <Image src="/favicon.ico" alt="Admin" className={styles.avatar} width={32} height={32} />
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
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Gestión de Horarios</h1>
          <div className={horarioStyles.horarioContainer}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <select value={selectedCiclo || ''} onChange={e => setSelectedCiclo(Number(e.target.value) || null)} className={horarioStyles.selectModern}>
                <option value="">Selecciona ciclo</option>
                {ciclos.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
              <select value={selectedGrado || ''} onChange={e => setSelectedGrado(Number(e.target.value) || null)} className={horarioStyles.selectModern}>
                <option value="">Selecciona grado</option>
                {grados.map(g => <option key={g.id} value={g.id}>{g.nombre} {g.seccion}</option>)}
              </select>
            </div>
            {selectedCiclo && selectedGrado && (
              <div style={{ display: 'flex', gap: 32 }}>
                {/* Materias asignadas */}
                <div style={{ minWidth: 220 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Materias asignadas</h3>
                  <div>
                    {materias.length === 0 && <div style={{ color: '#888', fontSize: 14 }}>Sin materias</div>}
                    {materias.map(m => (
                      <div
                        key={m.id}
                        className={horarioStyles.materiaDraggable}
                        draggable
                        onDragStart={() => onDragStart(m)}
                        onDragEnd={onDragEnd}
                        style={{ opacity: dragMateria && dragMateria.id === m.id ? 0.5 : 1 }}
                      >
                        {m.nombre}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Grilla de horario */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <table className={horarioStyles.horarioGrid} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th className={horarioStyles.horarioHeader}></th>
                        {DIAS.map(dia => (
                          <th key={dia} className={horarioStyles.horarioHeader}>{dia}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {HORAS.map((hora, rowIdx) => (
                        <tr key={hora}>
                          <td className={horarioStyles.horarioRowLabel}>{hora}</td>
                          {DIAS.map(dia => {
                            if (isCellCovered(dia, hora)) return null;
                            const bloque = getCellBlock(dia, hora);
                            return (
                              <td
                                key={dia + '-' + hora}
                                className={horarioStyles.horarioCell + (dragMateria ? ' ' + horarioStyles.horarioCellDroppable : '')}
                                onDragOver={e => { e.preventDefault(); }}
                                onDrop={() => onDropCell()}
                                rowSpan={bloque ? getBlockRowSpan(bloque) : 1}
                                style={{ position: 'relative', verticalAlign: 'top' }}
                              >
                                {bloque ? (
                                  <div className={horarioStyles.horarioMateria} style={{ height: 44 * getBlockRowSpan(bloque) }}>
                                    <div style={{ 
                                      display: 'flex', 
                                      flexDirection: 'column', 
                                      flex: 1,
                                      lineHeight: '1.2'
                                    }}>
                                      <div style={{ fontWeight: 700, fontSize: '14px' }}>
                                        {bloque.materia?.nombre || 'Sin nombre'}
                                      </div>
                                      <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>
                                        {bloque.docente?.name || 'Sin docente'}
                                      </div>
                                      {bloque.aula && (
                                        <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '1px' }}>
                                          📍 {bloque.aula.codigo}
                                        </div>
                                      )}
                                    </div>
                                    <button 
                                      className="removeBtn" 
                                      onClick={e => { e.preventDefault(); removeHorario(bloque.id); }} 
                                      title="Eliminar"
                                      style={{
                                        background: '#dc2626',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '4px',
                                        padding: '2px 6px',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        marginLeft: '8px'
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : null}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Modal de asignación flexible, fuera de la tabla */}
                  {showAsignarMenu && (
                    <div style={{
                      position: 'fixed',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: '#181A1B',
                      border: '3px solid #2563eb',
                      borderRadius: 14,
                      boxShadow: '0 6px 24px #0008',
                      zIndex: 100,
                      padding: 32,
                      minWidth: 320,
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: '#fff' }}>Asignar materia</div>
                      {pendingMateria && (
                        <div style={{ 
                          background: '#2563eb', 
                          padding: '8px 12px', 
                          borderRadius: '6px', 
                          marginBottom: '18px',
                          fontSize: '14px',
                          fontWeight: 600
                        }}>
                          📚 {pendingMateria.nombre}
                        </div>
                      )}
                      <label style={{ marginBottom: 12 }}>
                        Día:
                        <select value={selectedDia} onChange={e => setSelectedDia(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }}>
                          {DIAS.map(dia => <option key={dia} value={dia}>{dia}</option>)}
                        </select>
                      </label>
                      <label style={{ marginBottom: 12 }}>
                        Hora de inicio:
                        <select value={selectedHora} onChange={e => setSelectedHora(e.target.value)} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }}>
                          {HORAS.map(hora => <option key={hora} value={hora}>{hora}</option>)}
                        </select>
                      </label>
                      <label style={{ marginBottom: 18 }}>
                        Duración:
                        <select value={selectedDuracion} onChange={e => setSelectedDuracion(Number(e.target.value))} style={{ marginLeft: 8, padding: 6, borderRadius: 6 }}>
                          {[1,2,3,4].map(d => <option key={d} value={d}>{d} hora(s)</option>)}
                        </select>
                      </label>
                      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                        <button onClick={handleCancelAsignar} style={{
                          background: '#232527',
                          color: '#fff',
                          border: '2px solid #888',
                          borderRadius: 8,
                          padding: '8px 20px',
                          fontWeight: 600,
                          fontSize: 15,
                          transition: 'border 0.2s',
                          cursor: 'pointer',
                        }}>Cancelar</button>
                        <button onClick={handleConfirmAsignar} style={{
                          background: '#2563eb',
                          color: '#fff',
                          border: '2px solid #1d4ed8',
                          borderRadius: 8,
                          padding: '8px 20px',
                          fontWeight: 700,
                          fontSize: 15,
                          boxShadow: '0 2px 8px #2563eb44',
                          cursor: 'pointer',
                        }}>Confirmar</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {error && <div style={{ color: '#dc2626', marginTop: 16 }}>{error}</div>}
            {saving && <div style={{ color: 'var(--color-primary)', marginTop: 16 }}>Guardando...</div>}
            {loading && <div style={{ color: '#888', marginTop: 16 }}>Cargando horario...</div>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
