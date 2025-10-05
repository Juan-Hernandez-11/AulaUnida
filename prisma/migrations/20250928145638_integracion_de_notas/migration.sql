/*
  Warnings:

  - Added the required column `periodoId` to the `Calificacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Calificacion" ADD COLUMN     "periodoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Periodo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cicloId" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Periodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NotaMateriaPeriodo" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NotaMateriaPeriodo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotaMateriaPeriodo_estudianteId_materiaId_periodoId_key" ON "public"."NotaMateriaPeriodo"("estudianteId", "materiaId", "periodoId");

-- AddForeignKey
ALTER TABLE "public"."Periodo" ADD CONSTRAINT "Periodo_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "public"."Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Calificacion" ADD CONSTRAINT "Calificacion_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "public"."Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NotaMateriaPeriodo" ADD CONSTRAINT "NotaMateriaPeriodo_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NotaMateriaPeriodo" ADD CONSTRAINT "NotaMateriaPeriodo_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NotaMateriaPeriodo" ADD CONSTRAINT "NotaMateriaPeriodo_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "public"."Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
