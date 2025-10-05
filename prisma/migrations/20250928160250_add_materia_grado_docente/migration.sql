-- CreateTable
CREATE TABLE "public"."MateriaGradoDocente" (
    "id" SERIAL NOT NULL,
    "materiaGradoId" INTEGER NOT NULL,
    "docenteId" INTEGER NOT NULL,
    "periodoId" INTEGER,

    CONSTRAINT "MateriaGradoDocente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MateriaGradoDocente_materiaGradoId_docenteId_periodoId_key" ON "public"."MateriaGradoDocente"("materiaGradoId", "docenteId", "periodoId");

-- AddForeignKey
ALTER TABLE "public"."MateriaGradoDocente" ADD CONSTRAINT "MateriaGradoDocente_materiaGradoId_fkey" FOREIGN KEY ("materiaGradoId") REFERENCES "public"."MateriaGrado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MateriaGradoDocente" ADD CONSTRAINT "MateriaGradoDocente_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MateriaGradoDocente" ADD CONSTRAINT "MateriaGradoDocente_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "public"."Periodo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
