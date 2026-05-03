"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import styles from "../../../../styles/admin-dashboard.module.css";
import formStyles from "../../../../styles/admin-user-form.module.css";
import NextLink from "../../../../components/NextLink";
import Button from "../../../../components/ui/Button";
import { UserCircleIcon, AcademicCapIcon, ClipboardIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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

const sidebarLinks = [
  { label: 'Crear Usuario', icon: UserCircleIcon, href: '/admin/usuarios' },
  { label: 'Listado de usuarios', icon: UserCircleIcon, href: '/admin/usuarios/listado', active: true },
  { label: 'Grados/Secciones', icon: AcademicCapIcon, href: '/admin/grados' },
  { label: 'Promoción', icon: UserGroupIcon, href: '/admin/promocion' },
  { label: 'Matrícula', icon: ClipboardIcon, href: '/admin/matricula' },
];

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
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const token = await user!.getIdToken();
        const res = await fetch("/api/admin/usuarios", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setUsers(data);
        } else {
          setError(data.error || "Error al cargar usuarios");
          setUsers([]);
        }
      } catch (err) {
        setError("Error al cargar usuarios");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const handleEdit = (user: User) => {
    // Redirigir a la página de usuarios con el ID para editar
    window.location.href = `/admin/usuarios?edit=${user.id}`;
  };

  const handleToggleActive = async (userData: User) => {
    if (!authLoading && user) {
      try {
        const token = await user!.getIdToken();
        const res = await fetch("/api/admin/usuarios", {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ id: userData.id, active: !userData.active })
        });
        if (res.ok) {
          setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, active: !u.active } : u));
        } else {
          setError("No se pudo cambiar el estado");
        }
      } catch {
        setError("No se pudo cambiar el estado");
      }
    }
  };

  const handleDelete = async (userData: User) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    if (!authLoading && user) {
      try {
        const token = await user!.getIdToken();
        const res = await fetch("/api/admin/usuarios", {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ id: userData.id })
        });
        if (res.ok) {
          setUsers(prev => prev.filter(u => u.id !== userData.id));
        } else {
          setError("No se pudo eliminar el usuario");
        }
      } catch {
        setError("No se pudo eliminar el usuario");
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.sidebar}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
            <img src="/favicon.ico" alt="Admin" className={styles.avatar} />
            <span className={styles.logo}>AulaUnida</span>
          </div>
          <nav className={styles.menu}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarLinks.map(link => (
                <li key={link.label}>
                  <NextLink href={link.href} className={`${styles.menuItem} ${pathname === link.href ? styles.menuItemActive : ''}`}>
                    <link.icon style={{ width: 24, height: 24, marginRight: 16 }} />
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <BackToDashboardButton />
          <h1 className={styles.title}>Listado de Usuarios</h1>
          <div className={styles.activityCard}>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            {loading || authLoading ? (
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
