"use client";

import BoletinPDF from "./BoletinPDF";
import { useAuth } from "../../../context/authContext";
import { useRouter } from 'next/navigation';
import styles from '../../../styles/estudiante-notas.module.css';
import Button from '../../../components/ui/Button';
import TriangleIcon from '../../../components/icons/TriangleIcon';

export default function BoletinPage() {
  const { user } = useAuth();
  const router = useRouter();
  const cicloId = 1; // por ahora fijo, podría venir de user/selección

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Boletín</h2>
      <p>Descarga tu boletín académico en PDF.</p>
      <div style={{marginTop:12}}>
        <BoletinPDF cicloId={cicloId} estudianteUid={user?.uid} />
      </div>
      <div style={{marginTop:20}}>
        <Button variant="ghost" onClick={() => router.push('/estudiante')} icon={<TriangleIcon />}>Volver al panel</Button>
      </div>
    </div>
  );
}
