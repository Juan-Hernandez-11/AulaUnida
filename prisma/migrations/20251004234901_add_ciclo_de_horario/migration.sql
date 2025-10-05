/*
  Warnings:

  - Added the required column `cicloId` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Horario" ADD COLUMN     "cicloId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_cicloId_fkey" FOREIGN KEY ("cicloId") REFERENCES "Ciclo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
