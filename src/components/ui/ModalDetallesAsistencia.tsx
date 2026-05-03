import React from 'react';

interface Clase {
  id: number;
  nombre: string;
  presente: boolean;
  horaInicio: string;
  horaFin: string;
}

interface ModalDetallesAsistenciaProps {
  isOpen: boolean;
  dia: number | null;
  mes: number;
  año: number;
  clases: Clase[];
  onClose: () => void;
}

export default function ModalDetallesAsistencia({
  isOpen,
  dia,
  mes,
  año,
  clases,
  onClose
}: ModalDetallesAsistenciaProps) {
  if (!isOpen || !dia) return null;

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const fecha = `${dia} de ${monthNames[mes - 1]} de ${año}`;
  const totalClases = clases.length;
  const asistencias = clases.filter(c => c.presente).length;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1b1b1b',
          border: '1px solid #333',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={onClose}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
          <h2 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.5rem' }}>
            📅 {fecha}
          </h2>
          <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.9rem' }}>
            {asistencias} de {totalClases} clases asistidas
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.85rem' }}>
              Presente
            </p>
            <p
              style={{
                margin: '0.5rem 0 0 0',
                color: '#10b981',
                fontSize: '1.75rem',
                fontWeight: 'bold'
              }}
            >
              {asistencias}
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem',
              padding: '1rem',
              textAlign: 'center'
            }}
          >
            <p style={{ margin: '0', color: '#9ca3af', fontSize: '0.85rem' }}>
              Ausente
            </p>
            <p
              style={{
                margin: '0.5rem 0 0 0',
                color: '#ef4444',
                fontSize: '1.75rem',
                fontWeight: 'bold'
              }}
            >
              {totalClases - asistencias}
            </p>
          </div>
        </div>

        {/* Clases */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1rem' }}>
            Clases del día
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {clases.length > 0 ? (
              clases.map((clase) => (
                <div
                  key={clase.id}
                  style={{
                    backgroundColor: clase.presente
                      ? 'rgba(16, 185, 129, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${
                      clase.presente
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(239, 68, 68, 0.3)'
                    }`,
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem' }}>
                      {clase.nombre}
                    </h4>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: clase.presente ? '#10b981' : '#ef4444',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {clase.presente ? '✓ Presente' : '✗ Ausente'}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#9ca3af',
                      fontSize: '0.85rem'
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>
                      {clase.horaInicio} - {clase.horaFin}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#9ca3af', textAlign: 'center', margin: '2rem 0' }}>
                No hay registros de clases para este día
              </p>
            )}
          </div>
        </div>

        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#059669';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              '#10b981';
          }}
        >
          Cerrar
        </button>
      </div>
    </>
  );
}
