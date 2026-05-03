import React, { useState } from 'react';
import styles from '@/styles/estudiante-asistencia.module.css';
import ModalDetallesAsistencia from './ModalDetallesAsistencia';

interface Clase {
  id: number;
  nombre: string;
  presente: boolean;
  horaInicio: string;
  horaFin: string;
}

interface DayData {
  presente: boolean;
  clases: Clase[];
}

interface CalendarioAsistenciaProps {
  year: number;
  month: number;
  asistencias: Record<string, DayData>;
  onMonthChange?: (year: number, month: number) => void;
}

export default function CalendarioAsistencia({
  year,
  month,
  asistencias,
  onMonthChange
}: CalendarioAsistenciaProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const days = [];

  // Días vacíos del mes anterior
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const goToPreviousMonth = () => {
    if (month === 1) {
      onMonthChange?.(year - 1, 12);
    } else {
      onMonthChange?.(year, month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      onMonthChange?.(year + 1, 1);
    } else {
      onMonthChange?.(year, month + 1);
    }
  };

  const getDayStatus = (day: number | null) => {
    if (!day) return null;
    const dayStr = day.toString().padStart(2, '0');
    return asistencias[dayStr];
  };

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dayStr = day.toString().padStart(2, '0');
    if (asistencias[dayStr]) {
      setSelectedDay(day);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.calendario}>
        {/* Header del calendario */}
        <div className={styles.header}>
          <button onClick={goToPreviousMonth} className={styles.navButton}>
            ← Anterior
          </button>
          <h2 className={styles.monthYear}>
            {monthNames[month - 1]} {year}
          </h2>
          <button onClick={goToNextMonth} className={styles.navButton}>
            Siguiente →
          </button>
        </div>

        {/* Días de la semana */}
        <div className={styles.weekdays}>
          <div className={styles.weekday}>Dom</div>
          <div className={styles.weekday}>Lun</div>
          <div className={styles.weekday}>Mar</div>
          <div className={styles.weekday}>Mié</div>
          <div className={styles.weekday}>Jue</div>
          <div className={styles.weekday}>Vie</div>
          <div className={styles.weekday}>Sáb</div>
        </div>

        {/* Días del mes */}
        <div className={styles.days}>
          {days.map((day, index) => {
            const status = getDayStatus(day);
            const hasRecords = !!status;
            const isPresent = status?.presente;

            return (
              <div
                key={index}
                className={`${styles.day} ${!day ? styles.empty : ''} ${
                  hasRecords ? (isPresent ? styles.presente : styles.ausente) : ''
                }`}
                title={
                  hasRecords
                    ? `${status?.clases.length} clase(s) - Haz clic para detalles`
                    : 'Sin registro'
                }
                onClick={() => handleDayClick(day)}
                style={{
                  cursor: hasRecords ? 'pointer' : 'default'
                }}
              >
                <span className={styles.number}>{day}</span>
                {hasRecords && (
                  <div className={styles.indicator}>
                    {isPresent ? '✓' : '✗'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.box} ${styles.presente}`}></div>
            <span>Presente</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.box} ${styles.ausente}`}></div>
            <span>Ausente</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.box} ${styles.empty}`}></div>
            <span>Sin clase</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedDay !== null && (
        <ModalDetallesAsistencia
          isOpen={isModalOpen}
          dia={selectedDay}
          mes={month}
          año={year}
          clases={asistencias[selectedDay.toString().padStart(2, '0')]?.clases || []}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDay(null);
          }}
        />
      )}
    </>
  );
}
