import React from 'react';
import styles from './LoadingModal.module.css';
import Loading from './Loading';

interface Props { open: boolean; message?: string }

export default function LoadingModal({ open, message = 'Cargando...' }: Props) {
  if (!open) return null;
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.panel}>
        <Loading message={message} />
      </div>
    </div>
  );
}
