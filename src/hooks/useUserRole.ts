"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

// Hook para obtener el rol del usuario desde la API interna (PostgreSQL)
export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setFound(null);
      setLoading(false);
      return;
    }
    // Llama a tu API interna para obtener el rol por UID de Firebase
    const fetchRole = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user-role?uid=${user.uid}`);
        if (!res.ok) {
          console.error('Error fetching user role:', res.statusText);
          setRole(null);
          setFound(false);
          return;
        }
        const data = await res.json();
        setRole(data.role || null);
        setFound(data.found !== undefined ? data.found : true);
      } catch (err) {
        console.error('Error in useUserRole:', err);
        setRole(null);
        setFound(false);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user]);

  return { role, loading, found };
}
