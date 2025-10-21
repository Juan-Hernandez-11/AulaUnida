"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import styles from '../../../styles/estudiante-asignaturas.module.css';
import { useRouter } from 'next/navigation';
import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

export default function AsignaturasPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [notas, setNotas] = useState<any[]>([]);
  const [mergedMaterias, setMergedMaterias] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    user.getIdToken().then(async (token) => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        // Traer notas y horario en paralelo
        const [nRes, hRes] = await Promise.all([
          fetch('/api/estudiante/notas', { headers }),
          fetch('/api/estudiante/horario', { headers })
        ]);
        if (!nRes.ok) throw new Error('Error al obtener notas');
        if (!hRes.ok) throw new Error('Error al obtener horario');
        const nData = await nRes.json();
        const hData = await hRes.json();
        setNotas(Array.isArray(nData) ? nData : []);

        // Construir mapa de materias: tomar nombres desde horario y desde notas
        const materiasFromHorario = Array.isArray(hData) ? Array.from(new Set(hData.map((h: any) => String(h.materia)))) : [];
        const materiasFromNotas = Array.isArray(nData) ? Array.from(new Set(nData.map((n: any) => n.materia?.nombre).filter(Boolean))) : [];
        // Unir ambas listas
        const union = Array.from(new Set([...materiasFromHorario, ...materiasFromNotas]));

        // Si hay materias sin notas, las incluimos en el objeto materias con array vacío
        const notasMap = (Array.isArray(nData) ? nData : []).reduce((acc: any, cur: any) => {
          const nombre = cur.materia?.nombre || 'Sin materia';
          if (!acc[nombre]) acc[nombre] = [];
          acc[nombre].push(cur);
          return acc;
        }, {} as Record<string, any[]>);

        // Construir objeto final garantizando todas las materias del union
        const merged: Record<string, any[]> = {};
        union.forEach((m: string) => {
          merged[m] = notasMap[m] || [];
        });

        setNotas(Array.isArray(nData) ? nData : []);
        setMergedMaterias(merged);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }).catch(err => { setError('No se pudo obtener token'); setLoading(false); });
  }, [user]);

  // Recuperar las materias mergeadas que construimos en el effect
  const materias = Object.keys(mergedMaterias).length ? mergedMaterias : notas.reduce((acc: any, n: any) => {
    const nombre = n.materia?.nombre || 'Sin materia';
    if (!acc[nombre]) acc[nombre] = [];
    acc[nombre].push(n);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Asignaturas</h2>
      {loading && <p>Cargando asignaturas...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {!loading && Object.keys(materias).length === 0 && <p className={styles.empty}>No hay asignaturas disponibles.</p>}

      <div className={styles.grid}>
        {Object.entries(materias).map(([mat, arr]: any, i) => {
          const promedio = (arr.reduce((s: number, it: any) => s + (it.valor || 0), 0) / (arr.length || 1)).toFixed(2);
          return (
            <div key={i} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.matTitle}>{mat}</div>
                <div className={styles.matAverage}>Promedio: {promedio}</div>
              </div>
              <div className={styles.cardBody}>
                {arr.map((nota: any, idx: number) => (
                  <div key={idx} className={styles.noteRow}>
                    <div className={styles.notePeriod}>{nota.periodo?.nombre || 'Periodo'}</div>
                    <div className={styles.noteValue}>{nota.valor ?? '-'}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{marginTop:20}}>
        <Button variant="ghost" onClick={() => router.push('/estudiante')} icon={<TriangleIcon />}>Volver al panel</Button>
      </div>
    </div>
  );
}
