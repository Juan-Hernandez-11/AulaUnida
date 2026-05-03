'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import CalendarioAsistencia from '@/components/ui/CalendarioAsistencia';
import EstudianteLayout from '@/components/layout/EstudianteLayout';

interface DayData {
  presente: boolean;
  clases: Array<{
    id: number;
    nombre: string;
    presente: boolean;
    horaInicio: string;
    horaFin: string;
  }>;
}

function AsistenciaContent() {
  const { user } = useAuth();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [asistencias, setAsistencias] = useState<Record<string, DayData>>({});
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAsistencias = async () => {
      if (!user) return;

      setDataLoading(true);
      setError(null);

      try {
        // Obtener token
        const token = await user.getIdToken();

        const response = await fetch(
          `/api/estudiante/asistencia?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Error al cargar las asistencias');
        }

        const data = await response.json();
        setAsistencias(data.asistencias);
      } catch (err) {
        console.error('Error:', err);
        setError('No se pudieron cargar las asistencias');
      } finally {
        setDataLoading(false);
      }
    };

    fetchAsistencias();
  }, [user, year, month]);

  const handleMonthChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  const presentCount = Object.values(asistencias).filter(d => d.presente).length;
  const totalCount = Object.values(asistencias).length;
  const attendanceRate = totalCount > 0
    ? `${Math.round((presentCount / totalCount) * 100)}%`
    : 'N/A';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {error && (
        <div
          style={{
            backgroundColor: '#ef444420',
            border: '1px solid #ef4444',
            borderRadius: '0.5rem',
            padding: '1rem',
            color: '#fecaca'
          }}
        >
          {error}
        </div>
      )}

      {dataLoading ? (
        <div style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem' }}>
          ⏳ Cargando calendario...
        </div>
      ) : (
        <>
          <CalendarioAsistencia
            year={year}
            month={month}
            asistencias={asistencias}
            onMonthChange={handleMonthChange}
          />

          {/* Estadísticas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderLeft: '4px solid #10b981'
              }}
            >
              <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.9rem' }}>
                Asistencias en el mes
              </p>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  color: '#10b981',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                {presentCount}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderLeft: '4px solid #ef4444'
              }}
            >
              <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.9rem' }}>
                Inasistencias en el mes
              </p>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  color: '#ef4444',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                {totalCount - presentCount}
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderLeft: '4px solid #3b82f6'
              }}
            >
              <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.9rem' }}>
                Tasa de Asistencia
              </p>
              <p
                style={{
                  margin: '0.5rem 0 0 0',
                  color: '#3b82f6',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
              >
                {attendanceRate}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function EstudianteAsistenciaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <EstudianteLayout title="📅 Mi Asistencia" subtitle="Visualiza tu historial de asistencias por mes">
      <AsistenciaContent />
    </EstudianteLayout>
  );
}
