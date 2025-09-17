"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

// Hook para obtener el rol del usuario desde la API interna (PostgreSQL)
export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }
    // Llama a tu API interna para obtener el rol por UID de Firebase
    const fetchRole = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user-role?uid=${user.uid}`);
        const data = await res.json();
        setRole(data.role || null);
      } catch (err) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user]);

  return { role, loading };
}
