'use client';

import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../lib/firebaseClient";
import { useAuth } from "../../context/authContext";
import { useUserRole } from "../../hooks/useUserRole";
import { useRouter } from "next/navigation";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, loading, logout } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const router = useRouter();

  // Forzar logout automático al entrar a /login (solo para pruebas)
  useEffect(() => {
    if (user && !loading) {
      logout();
    }
  }, [user, loading, logout]);

  // Redirigir automáticamente según el rol
  useEffect(() => {
    if (user && !loading && role && !roleLoading) {
      if (role === 'ADMIN' || role === 'admin') router.replace('/admin');
      else if (role === 'DOCENTE' || role === 'docente') router.replace('/docente');
      else if (role === 'STUDENT' || role === 'estudiante') router.replace('/estudiante');
    }
  }, [user, loading, role, roleLoading, router]);

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

  if (user && (loading || roleLoading)) {
    return <div>Cargando...</div>;
  }
  if (user && role) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
}