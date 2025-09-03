-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'DOCENTE', 'STUDENT');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'STUDENT',
    "sedeId" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sede" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Sede_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Grado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "seccion" TEXT NOT NULL,
    "sedeId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "aulaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ciclo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ciclo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aula" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "sedeId" INTEGER NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MateriaDocente" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,

    CONSTRAINT "MateriaDocente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GradoEstudiante" (
    "id" SERIAL NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "GradoEstudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tarea" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fechaEntrega" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Entrega" (
    "id" SERIAL NOT NULL,
    "tareaId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "archivoUrl" TEXT,
    "texto" TEXT,
    "entregadaAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'entregada',

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Calificacion" (
    "id" SERIAL NOT NULL,
    "entregaId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "retroalimentacion" TEXT,
    "calificadaAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Asistencia" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "presente" BOOLEAN NOT NULL,

    CONSTRAINT "Asistencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Boletin" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "archivoUrl" TEXT NOT NULL,

    CONSTRAINT "Boletin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Incidencia" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evidenciaUrl" TEXT,

    CONSTRAINT "Incidencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Anuncio" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER,
    "autorId" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Horario" (
    "id" SERIAL NOT NULL,
    "gradoId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "dia" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "aulaId" INTEGER,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cambio" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "entidad" TEXT NOT NULL,
    "entidadId" INTEGER NOT NULL,
    "cambio" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cambio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aula_codigo_key" ON "public"."Aula"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "MateriaDocente_materiaId_docenteId_key" ON "public"."MateriaDocente"("materiaId", "docenteId");

-- CreateIndex
CREATE UNIQUE INDEX "GradoEstudiante_gradoId_estudianteId_key" ON "public"."GradoEstudiante"("gradoId", "estudianteId");

-- CreateIndex
CREATE UNIQUE INDEX "Calificacion_entregaId_key" ON "public"."Calificacion"("entregaId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "public"."Sede"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grado" ADD CONSTRAINT "Grado_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "public"."Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grado" ADD CONSTRAINT "Grado_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "public"."Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Grado" ADD CONSTRAINT "Grado_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."Aula"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Aula" ADD CONSTRAINT "Aula_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "public"."Sede"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Materia" ADD CONSTRAINT "Materia_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "public"."Grado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MateriaDocente" ADD CONSTRAINT "MateriaDocente_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MateriaDocente" ADD CONSTRAINT "MateriaDocente_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GradoEstudiante" ADD CONSTRAINT "GradoEstudiante_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "public"."Grado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GradoEstudiante" ADD CONSTRAINT "GradoEstudiante_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tarea" ADD CONSTRAINT "Tarea_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrega" ADD CONSTRAINT "Entrega_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "public"."Tarea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entrega" ADD CONSTRAINT "Entrega_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Calificacion" ADD CONSTRAINT "Calificacion_entregaId_fkey" FOREIGN KEY ("entregaId") REFERENCES "public"."Entrega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Asistencia" ADD CONSTRAINT "Asistencia_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Asistencia" ADD CONSTRAINT "Asistencia_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Boletin" ADD CONSTRAINT "Boletin_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Boletin" ADD CONSTRAINT "Boletin_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "public"."Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Incidencia" ADD CONSTRAINT "Incidencia_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Incidencia" ADD CONSTRAINT "Incidencia_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Incidencia" ADD CONSTRAINT "Incidencia_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anuncio" ADD CONSTRAINT "Anuncio_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Anuncio" ADD CONSTRAINT "Anuncio_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Horario" ADD CONSTRAINT "Horario_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "public"."Grado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Horario" ADD CONSTRAINT "Horario_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Horario" ADD CONSTRAINT "Horario_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Horario" ADD CONSTRAINT "Horario_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "public"."Aula"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cambio" ADD CONSTRAINT "Cambio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
