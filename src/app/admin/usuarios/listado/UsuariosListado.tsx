// Componente de listado de usuarios extraído de listado.tsx
import React, { useEffect, useState } from "react";
import Button from '../../../../components/ui/Button';
import LoadingModal from '@/components/ui/LoadingModal';
import useDelayedOpen from '@/hooks/useDelayedOpen';
import styles from '../../../../styles/usuarios-listado.module.css';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsuariosListado() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/usuarios")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const delayedOpen = useDelayedOpen(loading);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Usuarios</h1>
      {loading ? (
        <LoadingModal open={delayedOpen} message="Cargando usuarios..." />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Correo</th>
              <th className={styles.th}>Rol</th>
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.emptyCell}>(sin datos)</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className={styles.td}>{user.name || "-"}</td>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.role}</td>
                  <td className={styles.td}>
                    <Button className={styles.actionPrimary} variant="ghost">Editar</Button>
                    <button className={styles.actionDelete}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
