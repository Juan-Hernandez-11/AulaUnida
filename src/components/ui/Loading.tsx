import React from 'react';
import styles from './Loading.module.css';

interface Props { message?: string }

export default function Loading({ message = 'Cargando...' }: Props) {
  return (
    <div className={styles.loadingRoot}>
      <div className={styles.spinner} aria-hidden="true" />
      <div className={styles.text}>{message}</div>
    </div>
  );
}
