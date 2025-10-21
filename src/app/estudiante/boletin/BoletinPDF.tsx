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
      // Solo necesitamos cicloId; el backend usa el token para identificar al estudiante
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
    // Encabezado
    doc.setFontSize(16);
    doc.text("Boletín Académico", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre: ${data.estudiante.name || "-"}` , 20, 35);
    doc.text(`Documento: ${data.estudiante.documentNumber || "-"}` , 20, 42);
  const grado = data.estudiante.estudianteGrados?.[0]?.grado;
    doc.text(`Grado: ${grado?.nombre || "-"} ${grado?.seccion || ""}` , 20, 49);
    doc.text(`Sede: ${grado?.sede?.nombre || "-"}` , 20, 56);
    doc.text(`Ciclo: ${grado?.ciclo?.nombre || "-"}` , 20, 63);
  // Tabla de notas
    doc.text("Materia", 20, 75);
    doc.text("Periodo", 80, 75);
    doc.text("Nota", 140, 75);
    let y = 85;
    data.notas.forEach((n: any) => {
      doc.text(n.materia.nombre, 20, y);
      doc.text(n.periodo.nombre, 80, y);
      doc.text(String(n.valor), 140, y);
      y += 8;
    });
    doc.save("boletin.pdf");
    setLoading(false);
    } catch (err) {
      console.error('Error generando PDF', err);
      setLoading(false);
      alert('Error al generar el boletín');
    }
  };

  return (
    <Button variant="primary" onClick={generarPDF} disabled={loading}>{loading ? "Generando PDF..." : "Descargar Boletín PDF"}</Button>
  );
}