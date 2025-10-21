"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import styles from '../../../styles/estudiante-horario.module.css';
import { useRouter } from 'next/navigation';
import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

export default function HorarioPage() {
  const { user } = useAuth();
  const [horario, setHorario] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(token => {
      fetch('/api/estudiante/horario', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => setHorario(Array.isArray(data) ? data : []))
        .catch(err => console.error('Error fetching horario', err));
    });
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Horario Escolar</h2>
      {horario.length === 0 && <p className={styles.empty}>No hay horario disponible.</p>}
      {horario.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr><th>Dia</th><th>Hora</th><th>Materia</th><th>Aula</th></tr>
          </thead>
          <tbody>
            {horario.map((h, i) => (
              <tr key={i}>
                <td>{h.dia}</td>
                <td>{h.hora}</td>
                <td>{h.materia}</td>
                <td>{h.aula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <div style={{marginTop:20}}>
          <Button variant="ghost" onClick={() => router.push('/estudiante')} icon={<TriangleIcon />}>Volver al panel</Button>
        </div>
    </div>
  );
}
