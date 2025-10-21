"use client";
import React from 'react';
import { useAuth } from '../context/authContext';
import { useUserRole } from '../hooks/useUserRole';
import Loading from './ui/Loading';
import LoadingModal from './ui/LoadingModal';

// Componente para proteger rutas según autenticación y rol
export default function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (authLoading || roleLoading) return <LoadingModal open={true} message="Cargando..." />;
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
