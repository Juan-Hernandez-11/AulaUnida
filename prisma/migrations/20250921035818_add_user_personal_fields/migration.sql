/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Materia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `area` to the `Materia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Materia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Materia" ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "codigo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "photoUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigo_key" ON "public"."Materia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "User_documentNumber_key" ON "public"."User"("documentNumber");
