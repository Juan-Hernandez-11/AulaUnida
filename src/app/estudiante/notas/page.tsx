"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import styles from '../../../styles/estudiante-notas.module.css';
import { useRouter } from 'next/navigation';
import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

export default function NotasPage() {
  const { user } = useAuth();
  const [notas, setNotas] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    user.getIdToken().then(token => {
      fetch('/api/estudiante/notas', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(data => setNotas(Array.isArray(data) ? data : []))
        .catch(err => console.error('Error fetching notas', err));
    });
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mis Notas</h2>
      {notas.length === 0 && <p className={styles.empty}>No hay notas registradas.</p>}
      {notas.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr><th>Materia</th><th>Periodo</th><th>Nota</th></tr>
          </thead>
          <tbody>
            {notas.map((n, i) => (
              <tr key={i}>
                <td>{n.materia.nombre}</td>
                <td>{n.periodo.nombre}</td>
                <td>{n.valor}</td>
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
