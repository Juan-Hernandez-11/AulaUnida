/*
  Warnings:

  - You are about to drop the column `gradoId` on the `Materia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Materia" DROP CONSTRAINT "Materia_gradoId_fkey";

-- AlterTable
ALTER TABLE "public"."Materia" DROP COLUMN "gradoId";

-- CreateTable
CREATE TABLE "public"."MateriaGrado" (
    "id" SERIAL NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "gradoId" INTEGER NOT NULL,

    CONSTRAINT "MateriaGrado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MateriaGrado_materiaId_gradoId_key" ON "public"."MateriaGrado"("materiaId", "gradoId");

-- AddForeignKey
ALTER TABLE "public"."MateriaGrado" ADD CONSTRAINT "MateriaGrado_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "public"."Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MateriaGrado" ADD CONSTRAINT "MateriaGrado_gradoId_fkey" FOREIGN KEY ("gradoId") REFERENCES "public"."Grado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
