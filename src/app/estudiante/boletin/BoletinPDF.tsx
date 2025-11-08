"use client";
import { useState } from "react";
import jsPDF from "jspdf";
import { useAuth } from "../../../context/authContext";
import Button from '../../../components/ui/Button';

export default function BoletinPDF({ estudianteId, estudianteUid, cicloId }: { estudianteId?: number, estudianteUid?: string, cicloId: number }) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const generarPDF = async () => {
    setLoading(true);
    try {
      const token = user ? await user.getIdToken() : null;
      const params = new URLSearchParams();
      params.set('cicloId', String(cicloId));
      const res = await fetch(`/api/estudiante/boletin?${params.toString()}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();
      if (!data.estudiante || !Array.isArray(data.notas)) {
        setLoading(false);
        alert("No se encontraron datos para el boletín");
        return;
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Colores institucionales
      const primaryColor = [34, 197, 94] as const; // Verde
      const secondaryColor = [15, 23, 42] as const; // Azul oscuro
      const lightGray = [248, 250, 252] as const;
      const darkGray = [71, 85, 105] as const;

      // HEADER INSTITUCIONAL
      // Fondo del header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, pageWidth, 35, 'F');

      // Logo placeholder (círculo verde oscuro)
      doc.setFillColor(22, 163, 74);
      doc.circle(25, 17.5, 8, 'F');
      
      // Texto del logo en el círculo
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("", 20.5, 20);

      // Título principal
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("CORPORACIÓN UNIFICADA NACIONAL", 40, 15);
      
      // Subtítulo
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text("AULA UNIDA - Sistema Académico", 40, 25);

      // Línea decorativa
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(2);
      doc.line(0, 35, pageWidth, 35);

      // INFORMACIÓN DEL DOCUMENTO
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("BOLETÍN ACADÉMICO OFICIAL", pageWidth/2, 50, { align: 'center' });

      // Fecha y código del documento
      const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(`Fecha de emisión: ${fechaActual}`, pageWidth - 20, 45, { align: 'right' });
      doc.text(`Código: BOL-${Date.now().toString().slice(-6)}`, pageWidth - 20, 52, { align: 'right' });

      // INFORMACIÓN DEL ESTUDIANTE
      let currentY = 70;

      // Fondo de la sección del estudiante
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(15, currentY - 5, pageWidth - 30, 45, 'F');
      
      // Borde de la sección
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.rect(15, currentY - 5, pageWidth - 30, 45);

      // Título de la sección
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, currentY - 5, pageWidth - 30, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("INFORMACIÓN DEL ESTUDIANTE", 20, currentY + 2);

      currentY += 15;

      // Datos del estudiante
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");

      const grado = data.estudiante.estudianteGrados?.[0]?.grado;
      
      // Columna izquierda
      doc.text("Nombre completo:", 20, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(data.estudiante.name || "No registrado", 65, currentY);
      
      currentY += 8;
      doc.setFont("helvetica", "bold");
      doc.text("Documento:", 20, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(data.estudiante.documentNumber || "No registrado", 65, currentY);

      currentY += 8;
      doc.setFont("helvetica", "bold");
      doc.text("Grado:", 20, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(`${grado?.nombre || "No asignado"} ${grado?.seccion || ""}`, 65, currentY);

      // Columna derecha
      currentY = 85;
      doc.setFont("helvetica", "bold");
      doc.text("Sede:", 120, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(grado?.sede?.nombre || "No asignada", 165, currentY);

      currentY += 8;
      doc.setFont("helvetica", "bold");
      doc.text("Período académico:", 120, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(grado?.ciclo?.nombre || "No especificado", 165, currentY);

      currentY += 8;
      doc.setFont("helvetica", "bold");
      doc.text("Total de materias:", 120, currentY);
      doc.setFont("helvetica", "normal");
      const totalMaterias = [...new Set(data.notas.map((n: any) => n.materia.nombre))].length;
      doc.text(totalMaterias.toString(), 165, currentY);

      // TABLA DE CALIFICACIONES
      currentY += 25;

      // Título de la sección
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, currentY - 5, pageWidth - 30, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("REGISTRO DE CALIFICACIONES", 20, currentY + 2);

      currentY += 15;

      // Headers de la tabla
      doc.setFillColor(226, 232, 240);
      doc.rect(15, currentY - 5, pageWidth - 30, 10, 'F');
      
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("MATERIA", 20, currentY);
      doc.text("PERÍODO", 90, currentY);
      doc.text("CALIFICACIÓN", 130, currentY);
      doc.text("ESTADO", 170, currentY);

      currentY += 10;

      // Datos de las notas
      doc.setFont("helvetica", "normal");
      data.notas.forEach((nota: any, index: number) => {
        // Alternar colores de fila
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(15, currentY - 5, pageWidth - 30, 8, 'F');
        }

        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.text(nota.materia.nombre, 20, currentY);
        doc.text(nota.periodo.nombre, 90, currentY);
        
        // Color de la calificación según el valor
        const notaValor = nota.valor || 0;
        if (notaValor >= 3.5) {
          doc.setTextColor(34, 197, 94); // Verde
        } else if (notaValor >= 3.0) {
          doc.setTextColor(251, 191, 36); // Amarillo
        } else {
          doc.setTextColor(239, 68, 68); // Rojo
        }
        doc.setFont("helvetica", "bold");
        doc.text(String(notaValor), 130, currentY);

        // Estado
        doc.setFont("helvetica", "normal");
        if (notaValor >= 3.5) {
          doc.setTextColor(34, 197, 94);
          doc.text("EXCELENTE", 170, currentY);
        } else if (notaValor >= 3.0) {
          doc.setTextColor(251, 191, 36);
          doc.text("APROBADO", 170, currentY);
        } else {
          doc.setTextColor(239, 68, 68);
          doc.text("REPROBADO", 170, currentY);
        }

        currentY += 8;
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      });

      // RESUMEN ACADÉMICO
      currentY += 15;

      // Calcular promedio general
      const promedioGeneral = data.notas.length > 0 
        ? (data.notas.reduce((sum: number, nota: any) => sum + (nota.valor || 0), 0) / data.notas.length).toFixed(2)
        : '0.00';

      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(15, currentY - 5, pageWidth - 30, 25, 'F');
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.rect(15, currentY - 5, pageWidth - 30, 25);

      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("RESUMEN ACADÉMICO", 20, currentY + 2);

      currentY += 12;
      doc.setFontSize(11);
      doc.text("Promedio general:", 20, currentY);
      
      // Color del promedio
      const promedioNum = parseFloat(promedioGeneral);
      if (promedioNum >= 3.5) {
        doc.setTextColor(34, 197, 94);
      } else if (promedioNum >= 3.0) {
        doc.setTextColor(251, 191, 36);
      } else {
        doc.setTextColor(239, 68, 68);
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(promedioGeneral, 80, currentY);

      // FOOTER INSTITUCIONAL
      const footerY = pageHeight - 25;

      // Línea separadora
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(1);
      doc.line(15, footerY - 10, pageWidth - 15, footerY - 10);

      // Información institucional
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Corporación Unificada Nacional - CUN", 20, footerY);
      doc.text("Sistema AulaUnida | Gestión Académica Integral", 20, footerY + 5);
      doc.text("https://aulaunida.vercel.app | Tel: (+57) 3008148295", 20, footerY + 10);

      // Firma digital
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "italic");
      doc.text("Documento generado digitalmente", pageWidth - 20, footerY + 10, { align: 'right' });

      doc.save(`boletin_academico_${data.estudiante.name?.replace(/\s+/g, '_')}_${fechaActual.replace(/\s+/g, '_')}.pdf`);
      setLoading(false);
    } catch (err) {
      console.error('Error generando PDF', err);
      setLoading(false);
      alert('Error al generar el boletín');
    }
  };

  return (
    <Button variant="primary" onClick={generarPDF} disabled={loading}>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
            <path d="M21 12A9 9 0 1 1 3 12A9 9 0 0 1 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Generando PDF...
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Descargar Boletín PDF
        </div>
      )}
    </Button>
  );
}