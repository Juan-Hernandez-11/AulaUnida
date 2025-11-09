"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ProtectedRoute from "../../../../components/ProtectedRoute";
import styles from "../../../../styles/admin-dashboard.module.css";
import formStyles from "../../../../styles/admin-user-form.module.css";
import NextLink from "../../../../components/NextLink";
import Button from "../../../../components/ui/Button";

function BackToDashboardButton() {
  return (
    <div style={{ marginBottom: 24 }}>
  <NextLink href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 500 }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Volver al Dashboard
      </NextLink>
    </div>
  );
}

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  phone?: string;
  address?: string;
  gender?: string;
  photoUrl?: string;
  firebaseUid?: string;
  active: boolean;
};

export default function ListadoUsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/usuarios")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar usuarios");
        setLoading(false);
      });
  }, []);

  const handleEdit = (user: User) => {
    // Redirigir a la página de usuarios con el ID para editar
    window.location.href = `/admin/usuarios?edit=${user.id}`;
  };

  const handleToggleActive = async (user: User) => {
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, active: !user.active })
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, active: !u.active } : u));
      } else {
        setError("No se pudo cambiar el estado");
      }
    } catch {
      setError("No se pudo cambiar el estado");
    }
  };

  const handleDelete = async (user: User) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch("/api/admin/usuarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id })
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== user.id));
      } else {
        setError("No se pudo eliminar el usuario");
      }
    } catch {
      setError("No se pudo eliminar el usuario");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <Image src="/favicon.ico" alt="AulaUnida Admin" className={styles.avatar} width={32} height={32} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <NextLink href="/admin/usuarios" className={styles.menuItem}>Crear Usuario</NextLink>
              </li>
              <li>
                <NextLink href="/admin/usuarios/listado" className={styles.menuItem + ' ' + styles.menuItemActive}>Listado de usuarios</NextLink>
              </li>
              <li>
                <NextLink href="/admin/grados" className={styles.menuItem}>Grados/Secciones</NextLink>
              </li>
              <li>
                <NextLink href="/admin/matricula" className={styles.menuItem}>Matrícula</NextLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <h1 className={styles.title}>Listado de Usuarios</h1>
          <div className={styles.activityCard}>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            {loading ? (
              <div style={{ color: '#B0B3B8' }}>Cargando usuarios...</div>
            ) : (
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ color: '#B0B3B8' }}>(sin datos)</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name || '-'}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button onClick={() => handleToggleActive(user)} style={{ background: user.active ? '#22c55e' : '#dc2626', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}>
                            {user.active ? 'Activo' : 'Inactivo'}
                          </button>
                        </td>
                        <td>
                          <Button onClick={() => handleEdit(user)} style={{ color: 'var(--color-primary)', textDecoration: 'underline', marginRight: 12 }} variant="ghost">Editar</Button>
                          <button onClick={() => handleDelete(user)} style={{ color: '#dc2626', textDecoration: 'underline' }}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
