/*
  Warnings:

  - A unique constraint covering the columns `[estudianteId,materiaId,periodoId,numeroNota]` on the table `NotaMateriaPeriodo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numeroNota` to the `NotaMateriaPeriodo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NotaMateriaPeriodo_estudianteId_materiaId_periodoId_key";

-- AlterTable
ALTER TABLE "NotaMateriaPeriodo" ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "numeroNota" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NotaMateriaPeriodo_estudianteId_materiaId_periodoId_numeroN_key" ON "NotaMateriaPeriodo"("estudianteId", "materiaId", "periodoId", "numeroNota");
