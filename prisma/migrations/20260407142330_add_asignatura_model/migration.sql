-- DropIndex
DROP INDEX "public"."NotaDetalle_estudianteId_idx";

-- DropIndex
DROP INDEX "public"."NotaDetalle_materiaId_idx";

-- DropIndex
DROP INDEX "public"."NotaDetalle_periodoId_idx";

-- AlterTable
ALTER TABLE "public"."Materia" ADD COLUMN     "asignaturaId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Asignatura" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asignatura_nombre_key" ON "public"."Asignatura"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Asignatura_codigo_key" ON "public"."Asignatura"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Materia" ADD CONSTRAINT "Materia_asignaturaId_fkey" FOREIGN KEY ("asignaturaId") REFERENCES "public"."Asignatura"("id") ON DELETE SET NULL ON UPDATE CASCADE;
