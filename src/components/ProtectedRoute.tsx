import React from 'react';
import { useAuth } from '../context/authContext';
import { useUserRole } from '../hooks/useUserRole';

// Componente para proteger rutas según autenticación y rol
export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) return <div>Cargando...</div>;
  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <div>No tienes permiso para acceder a esta página.</div>;
  }

  return <>{children}</>;
}
