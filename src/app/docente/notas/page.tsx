"use client";

import { useEffect, useState, useCallback, useMemo, memo } from "react";
import Image from 'next/image';
import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import { CalendarIcon, BookOpenIcon, HomeIcon } from '@heroicons/react/24/outline';
import NextLink from '../../../components/NextLink';
import styles from '../../../styles/admin-dashboard.module.css';

// Constantes
const NOTA_MIN = 0.0;
const NOTA_MAX = 5.0;
const NOTAS_POR_PERIODO = [1, 2, 3] as const;

const sidebarLinks = [
  { label: 'Dashboard', icon: HomeIcon, href: '/docente' },
  { label: 'Mi Horario', icon: CalendarIcon, href: '/docente/horarios' },
  { label: 'Asignar Notas', icon: BookOpenIcon, href: '/docente/notas' },
] as const;

// Tipos optimizados
type NotasEstudiante = Record<number, number>; // {numeroNota: valor}
type NotasState = Record<number, NotasEstudiante>; // {estudianteId: NotasEstudiante}

interface NotaExistente {
  id: number;
  valor: number;
  numeroNota: number;
  descripcion?: string;
}

interface Periodo {
  id: number;
  nombre: string;
}

interface Estudiante {
  id: number;
  name: string;
  email: string;
  notasPorPeriodo: Record<number, {
    periodo: Periodo;
    notas: NotaExistente[];
  }>;
  promedio: number;
  totalNotas: number;
  periodosConNotas: number;
}

interface Asignacion {
  gradoId: number;
  materiaId: number;
  cicloId: number;
  grado: { id: number; nombre: string; seccion: string };
  materia: { id: number; nombre: string };
  ciclo: { id: number; nombre: string };
}

interface SelectedAsignacion {
  gradoId: number;
  materiaId: number;
  cicloId: number;
}

// Funciones utilitarias
const calcularPromedioPeriodo = (notasEstudiante: NotasEstudiante): number => {
  const valores = Object.values(notasEstudiante).filter(v => v > 0);
  return valores.length > 0 ? valores.reduce((sum, val) => sum + val, 0) / valores.length : 0;
};

const validarNota = (valor: number): boolean => {
  return !isNaN(valor) && valor >= NOTA_MIN && valor <= NOTA_MAX;
};

// Componente optimizado para fila de estudiante
const EstudianteRow = memo(({ 
  estudiante, 
  periodoId, 
  notas, 
  onNotaChange 
}: {
  estudiante: Estudiante;
  periodoId: number;
  notas: NotasEstudiante;
  onNotaChange: (numeroNota: number, valor: number) => void;
}) => {
  const notasDelPeriodo = estudiante.notasPorPeriodo[periodoId]?.notas || [];
  const promedioDelPeriodo = calcularPromedioPeriodo(notas);
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
      gap: '1rem',
      padding: '1.5rem',
      backgroundColor: '#0f172a',
      borderRadius: '8px',
      border: '1px solid #334155',
      alignItems: 'center'
    }}>
      {/* Información del estudiante */}
      <div>
        <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
          {estudiante.name}
        </div>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {estudiante.email}
        </div>
      </div>
      
      {/* 3 Campos para notas del período */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {NOTAS_POR_PERIODO.map(numeroNota => {
          const notaExistente = notasDelPeriodo.find(n => n.numeroNota === numeroNota);
          const valorActual = notas[numeroNota] ?? (notaExistente?.valor || '');
          
          return (
            <div key={numeroNota} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                Nota {numeroNota}
              </div>
              <input
                type="number"
                min={NOTA_MIN}
                max={NOTA_MAX}
                step={0.1}
                placeholder="0.0"
                value={valorActual}
                onChange={ev => {
                  const valor = parseFloat(ev.target.value);
                  onNotaChange(numeroNota, valor);
                }}
                style={{
                  width: 60,
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: notaExistente ? '1px solid #0ea5e9' : '1px solid #22c55e',
                  background: '#1e293b',
                  color: '#f8fafc',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              />
            </div>
          );
        })}
        
        {/* Mostrar promedio del período */}
        {promedioDelPeriodo > 0 && (
          <div style={{ 
            marginLeft: '0.5rem', 
            padding: '6px 8px',
            backgroundColor: '#1e293b',
            borderRadius: '4px',
            border: '1px solid #334155',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Promedio</div>
            <div style={{ 
              color: getColorPromedio(promedioDelPeriodo),
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              {promedioDelPeriodo.toFixed(1)}
            </div>
          </div>
        )}
      </div>
      
      {/* Promedio acumulado */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          color: getColorPromedio(estudiante.promedio),
          fontWeight: 700,
          fontSize: '1.2rem'
        }}>
          {estudiante.promedio > 0 ? estudiante.promedio.toFixed(2) : '--'}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.25rem' }}>
          {getEstadoPromedio(estudiante.promedio)}
        </div>
      </div>
      
      {/* Total de notas */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '1.1rem' }}>
          {estudiante.totalNotas}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.25rem' }}>
          {estudiante.periodosConNotas} períodos
        </div>
      </div>
    </div>
  );
});

EstudianteRow.displayName = 'EstudianteRow';

const getColorPromedio = (promedio: number): string => {
  if (promedio >= 3.0) return '#22c55e'; // Verde
  if (promedio >= 2.0) return '#f59e0b'; // Amarillo
  return '#dc2626'; // Rojo
};

const getEstadoPromedio = (promedio: number): string => {
  if (promedio >= 3.0) return 'Aprobado';
  if (promedio > 0) return 'En riesgo';
  return 'Sin notas';
};

export default function DocenteNotasPage() {
  // Estados principales
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [notas, setNotas] = useState<NotasState>({});
  const [docenteInfo, setDocenteInfo] = useState<any>(null);
  
  // Estados de selección
  const [selected, setSelected] = useState<SelectedAsignacion | null>(null);
  const [periodoId, setPeriodoId] = useState<number | null>(null);
  
  // Estados de UI
  const [loadingEstudiantes, setLoadingEstudiantes] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  
  const { user, logout } = useAuth();
  const router = useRouter();

  // Funciones API optimizadas
  const fetchWithAuth = useCallback(async (url: string, options?: RequestInit) => {
    if (!user) throw new Error('Usuario no autenticado');
    const idToken = await user.getIdToken();
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${idToken}`,
      },
    });
  }, [user]);

  const fetchAsignacionesYDocente = useCallback(async () => {
    if (!user) return;
    
    try {
      const [asignacionesRes, docenteRes] = await Promise.all([
        fetchWithAuth("/api/docente/asignaciones"),
        fetchWithAuth('/api/docente/info')
      ]);
      
      const [asignacionesData, docenteData] = await Promise.all([
        asignacionesRes.json(),
        docenteRes.json()
      ]);
      
      setAsignaciones(Array.isArray(asignacionesData) ? asignacionesData : []);
      setDocenteInfo(docenteData.docente);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
      setAsignaciones([]);
    }
  }, [user, fetchWithAuth]);

  const fetchEstudiantesYPeriodos = useCallback(async (asignacion: SelectedAsignacion) => {
    if (!user) return;
    
    setLoadingEstudiantes(true);
    try {
      const [estudiantesRes, periodosRes] = await Promise.all([
        fetchWithAuth(`/api/docente/estudiantes?gradoId=${asignacion.gradoId}&materiaId=${asignacion.materiaId}`),
        fetchWithAuth(`/api/admin/periodos?cicloId=${asignacion.cicloId}`)
      ]);
      
      const [estudiantesData, periodosData] = await Promise.all([
        estudiantesRes.json(),
        periodosRes.json()
      ]);
      
      setEstudiantes(Array.isArray(estudiantesData) ? estudiantesData : []);
      setPeriodos(Array.isArray(periodosData) ? periodosData : []);
    } catch (error) {
      console.error('Error cargando estudiantes y períodos:', error);
      setEstudiantes([]);
      setPeriodos([]);
    } finally {
      setLoadingEstudiantes(false);
    }
  }, [user, fetchWithAuth]);

  const fetchNotasDelPeriodo = useCallback(async (asignacion: SelectedAsignacion, periodoId: number) => {
    if (!user) return;
    
    try {
      const res = await fetchWithAuth(
        `/api/docente/notas?gradoId=${asignacion.gradoId}&materiaId=${asignacion.materiaId}&periodoId=${periodoId}`
      );
      const data = await res.json();
      
      if (Array.isArray(data)) {
        const notasObj: NotasState = {};
        data.forEach((n: any) => {
          if (!notasObj[n.estudianteId]) notasObj[n.estudianteId] = {};
          notasObj[n.estudianteId][n.numeroNota] = n.valor;
        });
        setNotas(notasObj);
      }
    } catch (error) {
      console.error('Error cargando notas:', error);
      setNotas({});
    }
  }, [user, fetchWithAuth]);

  // Effects optimizados
  useEffect(() => {
    fetchAsignacionesYDocente();
  }, [fetchAsignacionesYDocente]);

  useEffect(() => {
    if (selected) {
      fetchEstudiantesYPeriodos(selected);
      setNotas({});
      setPeriodoId(null);
    } else {
      setEstudiantes([]);
      setPeriodos([]);
      setNotas({});
      setPeriodoId(null);
    }
  }, [selected, fetchEstudiantesYPeriodos]);

  useEffect(() => {
    if (selected && periodoId) {
      fetchNotasDelPeriodo(selected, periodoId);
    } else {
      setNotas({});
    }
  }, [selected, periodoId, fetchNotasDelPeriodo]);

  // Handlers optimizados
  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    if (idx >= 0 && asignaciones[idx]) {
      const a = asignaciones[idx];
      setSelected({ gradoId: a.gradoId, materiaId: a.materiaId, cicloId: a.cicloId });
    } else {
      setSelected(null);
    }
  }, [asignaciones]);

  const handleNota = useCallback((estudianteId: number, numeroNota: number, valor: number) => {
    if (validarNota(valor)) {
      setNotas(prev => ({ 
        ...prev, 
        [estudianteId]: {
          ...prev[estudianteId],
          [numeroNota]: valor
        }
      }));
    } else if (isNaN(valor)) {
      setNotas(prev => ({ 
        ...prev, 
        [estudianteId]: {
          ...prev[estudianteId],
          [numeroNota]: 0
        }
      }));
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/login');
  }, [logout, router]);

  // Guardar notas
  const handleGuardar = async () => {
    if (!selected || !periodoId || !user) return;
    setSaving(true);
    setMsg("");
    
    const notasArr: Array<{estudianteId: number, numeroNota: number, valor: number}> = [];
    
    Object.entries(notas).forEach(([estudianteId, notasEstudiante]) => {
      Object.entries(notasEstudiante).forEach(([numeroNota, valor]) => {
        if (typeof valor === 'number' && !isNaN(valor) && valor >= 0.0 && valor <= 5.0) {
          notasArr.push({
            estudianteId: Number(estudianteId),
            numeroNota: Number(numeroNota),
            valor: Number(valor)
          });
        }
      });
    });
    
    if (notasArr.length === 0) {
      setMsg("No hay notas válidas para guardar (deben estar entre 0.0 y 5.0)");
      setSaving(false);
      return;
    }
    
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/docente/notas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${idToken}` 
        },
        body: JSON.stringify({
          gradoId: selected.gradoId,
          materiaId: selected.materiaId,
          periodoId,
          notas: notasArr
        })
      });
      
      if (res.ok) {
        setMsg("Notas guardadas correctamente");
        // Recargar estudiantes para actualizar promedio
        const estudiantesRes = await fetch(`/api/docente/estudiantes?gradoId=${selected.gradoId}&materiaId=${selected.materiaId}`, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        if (estudiantesRes.ok) {
          const data = await estudiantesRes.json();
          setEstudiantes(Array.isArray(data) ? data : []);
        }
      } else {
        setMsg("Error al guardar notas");
      }
    } catch (error) {
      setMsg("Error al guardar notas");
    }
    
    setSaving(false);
  };

  // Valores memoizados para optimización
  const asignacionSeleccionada = useMemo(() => {
    return selected ? asignaciones.find(a => 
      a.gradoId === selected.gradoId && a.materiaId === selected.materiaId
    ) : null;
  }, [selected, asignaciones]);

  const tieneNotasParaGuardar = useMemo(() => {
    return Object.values(notas).some(notasEstudiante => 
      Object.values(notasEstudiante).some(valor => validarNota(valor))
    );
  }, [notas]);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          <Image src="https://randomuser.me/api/portraits/men/32.jpg" alt="Docente" className={styles.avatar} width={32} height={32} />
          <span className={styles.logo}>AulaUnida</span>
        </div>
        <nav className={styles.menu}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarLinks.map((link, idx) => (
              <li key={link.label}>
                <NextLink href={link.href} className={`${styles.menuItem} ${link.href === '/docente/notas' ? styles.menuItemActive : ''}`}>
                  <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <span style={{ marginRight: 8 }}>⎋</span> Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Asignación de Notas</h1>
        {docenteInfo ? (
          <p className={styles.subtitle}>Gestiona las calificaciones de tus estudiantes, {docenteInfo.name}</p>
        ) : (
          <p className={styles.subtitle}>Selecciona un grupo y periodo para asignar notas</p>
        )}

        <div className={styles.activityCard}>
          <h2 className={styles.activityTitle}>Seleccionar Grupo y Periodo</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1', fontWeight: 600 }}>
              Grupo y Materia:
            </label>
            <select 
              onChange={handleSelect} 
              defaultValue={-1}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#f8fafc',
                fontSize: '1rem'
              }}
            >
              <option value={-1}>Selecciona grupo y materia</option>
              {Array.isArray(asignaciones) && asignaciones.length > 0 && asignaciones.map((a, i) => (
                <option key={i} value={i}>{a.grado.nombre} {a.grado.seccion} - {a.materia.nombre} ({a.ciclo.nombre})</option>
              ))}
              {Array.isArray(asignaciones) && asignaciones.length === 0 && (
                <option disabled value={-1}>No tienes asignaciones disponibles</option>
              )}
            </select>
          </div>
          
          {selected && (
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#CBD5E1', fontWeight: 600 }}>
                Periodo:
              </label>
              <select 
                value={periodoId || ''} 
                onChange={e => setPeriodoId(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  background: '#1e293b',
                  color: '#f8fafc',
                  fontSize: '1rem'
                }}
              >
                <option value=''>Selecciona periodo</option>
                {periodos.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
          )}
          
          {estudiantes.length > 0 && periodoId && !loadingEstudiantes && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#f8fafc', fontSize: '1.25rem', fontWeight: 600 }}>
                  Estudiantes del grupo {asignacionSeleccionada?.grado.nombre} {asignacionSeleccionada?.grado.seccion}
                </h3>
                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>
                  Total: {estudiantes.length} estudiantes
                </div>
              </div>
              
              {/* Encabezados de tabla */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#1e293b',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#cbd5e1'
              }}>
                <div>Estudiante</div>
                <div style={{ textAlign: 'center' }}>Notas del Período</div>
                <div style={{ textAlign: 'center' }}>Promedio Acumulado</div>
                <div style={{ textAlign: 'center' }}>Total Notas</div>
              </div>
              
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {estudiantes.map((estudiante) => (
                  <EstudianteRow
                    key={estudiante.id}
                    estudiante={estudiante}
                    periodoId={periodoId}
                    notas={notas[estudiante.id] || {}}
                    onNotaChange={(numeroNota, valor) => handleNota(estudiante.id, numeroNota, valor)}
                  />
                ))}
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  onClick={handleGuardar}
                  disabled={saving || !periodoId || estudiantes.length === 0 || !tieneNotasParaGuardar}
                  className={styles.primaryBtn}
                  style={{
                    padding: '12px 32px',
                    fontSize: '1.1rem',
                    opacity: saving ? 0.7 : 1,
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  {saving ? 'Guardando...' : 'Guardar Notas'}
                </button>
                
                {msg && (
                  <p style={{ 
                    color: msg.startsWith('Error') ? '#dc2626' : '#22c55e', 
                    fontWeight: 600,
                    marginTop: '1rem',
                    fontSize: '1rem'
                  }}>
                    {msg}
                  </p>
                )}
                
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748B' }}>
                  💡 Puedes ingresar hasta 3 notas por período. El promedio se calcula automáticamente.
                </div>
              </div>
            </div>
          )}
          
          {/* Estado de carga para estudiantes */}
          {loadingEstudiantes && (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#64748B'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                Cargando estudiantes y calculando promedios...
              </div>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #334155',
                borderTop: '3px solid #22c55e',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
            </div>
          )}
          
          {/* Estado cuando no hay estudiantes */}
          {!loadingEstudiantes && estudiantes.length === 0 && selected && periodoId && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#64748B'
            }}>
              <BookOpenIcon style={{ width: 64, height: 64, margin: '0 auto 1rem', color: '#9CA3AF' }} />
              <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>No hay estudiantes matriculados</h3>
              <p>No se encontraron estudiantes en este grado o no tienes permisos para ver esta información.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
