'use client';

import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../lib/firebaseClient";
import { useAuth } from "../../context/authContext";
import { useUserRole } from "../../hooks/useUserRole";
import { useRouter } from "next/navigation";
import styles from "../../styles/login.module.css";
import Button from '../../components/ui/Button';
import TriangleIcon from '../../components/icons/TriangleIcon';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, loading, logout } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const router = useRouter();


  // Si el usuario ya está autenticado y tiene rol, redirige automáticamente
  useEffect(() => {
    if (user && !loading && role && !roleLoading) {
      if (role === 'ADMIN' || role === 'admin') router.replace('/admin');
      else if (role === 'DOCENTE' || role === 'docente') router.replace('/docente');
      else if (role === 'STUDENT' || role === 'estudiante') router.replace('/estudiante');
    }
  }, [user, loading, role, roleLoading, router]);

  // (La redirección ya está incluida arriba)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      // El useEffect se encargará de redirigir
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };


  // Mostrar loading si está cargando la sesión
  if (loading || roleLoading) {
    return <div className={styles["login-bg"]}>Cargando...</div>;
  }
  // Si ya hay usuario y rol, mostrar mensaje de redirección
  if (user && role) {
    return <div className={styles["login-bg"]}>Redirigiendo...</div>;
  }

  return (
    <div className={styles["login-bg"]}>
      <header className={styles["login-header"]}>
        <span className={styles.logo}></span>
        AulaUnida
      </header>
      <div className={styles["login-center"]}>
        <div className={styles["login-card"]}>
          <div className={styles["login-title"]}>Bienvenido a AulaUnida</div>
          <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <input
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button type="submit" variant="primary">Ingresar</Button>
            {error && <div className={styles["login-error"]}>{error}</div>}
          </form>
          {/* Botón para volver a la página principal */}
          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="ghost" onClick={() => router.push('/') } icon={<TriangleIcon />}>Volver a la página principal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}