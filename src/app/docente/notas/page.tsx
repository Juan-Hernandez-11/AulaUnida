"use client";

import { useEffect, useState } from "react";
import { useAuth } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/admin-horarios.module.css';
import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

export default function DocenteNotasPage() {
  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const { user } = useAuth();
  const [selected, setSelected] = useState<{gradoId:number, materiaId:number, cicloId:number}|null>(null);
  const [estudiantes, setEstudiantes] = useState<any[]>([]);
  const [periodos, setPeriodos] = useState<any[]>([]);
  const [periodoId, setPeriodoId] = useState<number|null>(null);
  const [notas, setNotas] = useState<{[estudianteId:number]: number}>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  // Cargar asignaciones del docente
  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(idToken => {
      fetch("/api/docente/asignaciones", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then(r => r.json())
        .then(data => {
          setAsignaciones(Array.isArray(data) ? data : []);
        });
    });
  }, [user]);

  // Cargar estudiantes y periodos al seleccionar grupo/materia
  useEffect(() => {
    if (selected) {
      fetch(`/api/docente/estudiantes?gradoId=${selected.gradoId}&materiaId=${selected.materiaId}`)
        .then(r => r.json()).then(setEstudiantes);
      fetch(`/api/admin/periodos?cicloId=${selected.cicloId}`)
        .then(r => r.json()).then(setPeriodos);
    } else {
      setEstudiantes([]);
      setPeriodos([]);
    }
  }, [selected]);

  // Cargar notas existentes al seleccionar grupo/materia y periodo
  useEffect(() => {
    if (selected && periodoId && user) {
      const fetchNotas = async () => {
        const idToken = await user.getIdToken();
        const res = await fetch(`/api/docente/notas?gradoId=${selected.gradoId}&materiaId=${selected.materiaId}&periodoId=${periodoId}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          const notasObj: {[id:number]: number} = {};
          data.forEach((n: any) => { notasObj[n.estudianteId] = n.valor; });
          setNotas(notasObj);
        }
      };
      fetchNotas();
    }
  }, [selected, periodoId, user]);

  // Handler para seleccionar grupo/materia
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    if (idx >= 0) {
      const a = asignaciones[idx];
      setSelected({ gradoId: a.gradoId, materiaId: a.materiaId, cicloId: a.cicloId });
      setNotas({});
      setPeriodoId(null);
    }
  };

  // Handler para cambiar nota
  const handleNota = (estudianteId: number, valor: number) => {
    setNotas(prev => ({ ...prev, [estudianteId]: valor }));
  };

  // Guardar notas
  const handleGuardar = async () => {
    if (!selected || !periodoId) return;
    setSaving(true);
    setMsg("");
    const notasArr = Object.entries(notas)
      .filter(([_, valor]) => typeof valor === 'number' && !isNaN(valor))
      .map(([estudianteId, valor]) => ({ estudianteId: Number(estudianteId), valor: Number(valor) }));
    if (notasArr.length === 0) {
      setMsg("No hay notas para guardar");
      setSaving(false);
      return;
    }
    const res = await fetch("/api/docente/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(user ? { Authorization: `Bearer ${await user.getIdToken()}` } : {}) },
      body: JSON.stringify({
        gradoId: selected.gradoId,
        materiaId: selected.materiaId,
        periodoId,
        notas: notasArr
      })
    });
    if (res.ok) setMsg("Notas guardadas correctamente");
    else setMsg("Error al guardar notas");
    setSaving(false);
  };

  return (
    <div className={styles.horarioContainer} style={{ maxWidth: 900, margin: '40px auto' }}>
      <div style={{ marginBottom: 18 }}>
        <Button variant="ghost" onClick={() => router.back()} icon={<TriangleIcon />}>Volver</Button>
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 26, marginBottom: 24, color: '#fff' }}>Asignación de Notas</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <select className={styles.selectModern} onChange={handleSelect} defaultValue={-1}>
          <option value={-1}>Selecciona grupo y materia</option>
          {Array.isArray(asignaciones) && asignaciones.length > 0 && asignaciones.map((a, i) => (
            <option key={i} value={i}>{a.grado.nombre} {a.grado.seccion} - {a.materia.nombre} ({a.ciclo.nombre})</option>
          ))}
          {Array.isArray(asignaciones) && asignaciones.length === 0 && (
            <option disabled value={-1}>No tienes asignaciones disponibles</option>
          )}
        </select>
        <select className={styles.selectModern} value={periodoId || ''} onChange={e => setPeriodoId(Number(e.target.value))}>
          <option value=''>Selecciona periodo</option>
          {periodos.map((p: any) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>
      {estudiantes.length > 0 && periodoId && (
        <table className={styles.horarioGrid} style={{ marginTop: 18 }}>
          <thead>
            <tr>
              <th className={styles.horarioHeader}>Estudiante</th>
              <th className={styles.horarioHeader}>Nota</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((e: any) => (
              <tr key={e.id}>
                <td className={styles.horarioRowLabel} style={{ textAlign: 'left', fontWeight: 500 }}>{e.nombres} {e.apellidos}</td>
                <td className={styles.horarioCell}>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={notas[e.id] ?? ''}
                    onChange={ev => {
                      const valor = Number(ev.target.value);
                      if (valor >= 0 && valor <= 100) handleNota(e.id, valor);
                    }}
                    style={{
                      width: 80,
                      padding: '7px 10px',
                      borderRadius: 7,
                      border: '2px solid var(--color-primary)',
                      background: '#181A1B',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 15,
                      outline: 'none',
                      boxShadow: '0 2px 8px #0002',
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
        <Button
          variant="primary"
          onClick={handleGuardar}
          disabled={saving || !periodoId || estudiantes.length === 0 || Object.keys(notas).length === 0}
        >
          {saving ? 'Guardando...' : 'Guardar Notas'}
        </Button>
        {msg && <span style={{ color: msg.startsWith('Error') ? '#dc2626' : '#22c55e', fontWeight: 600, fontSize: 16 }}>{msg}</span>}
      </div>
    </div>
  );
}
