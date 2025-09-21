// Componente de listado de usuarios extraído de listado.tsx
import React, { useEffect, useState } from "react";

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

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Listado de Usuarios</h1>
      {loading ? (
        <div style={{ color: "#B0B3B8" }}>Cargando usuarios...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#18181b", color: "#fff" }}>
          <thead>
            <tr>
              <th style={{ padding: 12, borderBottom: "1px solid #333" }}>Nombre</th>
              <th style={{ padding: 12, borderBottom: "1px solid #333" }}>Correo</th>
              <th style={{ padding: 12, borderBottom: "1px solid #333" }}>Rol</th>
              <th style={{ padding: 12, borderBottom: "1px solid #333" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: "#B0B3B8", textAlign: "center" }}>(sin datos)</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: 12 }}>{user.name || "-"}</td>
                  <td style={{ padding: 12 }}>{user.email}</td>
                  <td style={{ padding: 12 }}>{user.role}</td>
                  <td style={{ padding: 12 }}>
                    <button style={{ color: "#2563eb", textDecoration: "underline", marginRight: 12 }}>Editar</button>
                    <button style={{ color: "#dc2626", textDecoration: "underline" }}>Eliminar</button>
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
