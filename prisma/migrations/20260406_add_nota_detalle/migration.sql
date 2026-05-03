-- CreateTable NotaDetalle
CREATE TABLE "NotaDetalle" (
    "id" SERIAL NOT NULL,
    "estudianteId" INTEGER NOT NULL,
    "materiaId" INTEGER NOT NULL,
    "periodoId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notaMateriaPeriodoId" INTEGER,

    CONSTRAINT "NotaDetalle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NotaDetalle_estudianteId_idx" ON "NotaDetalle"("estudianteId");
CREATE INDEX "NotaDetalle_materiaId_idx" ON "NotaDetalle"("materiaId");
CREATE INDEX "NotaDetalle_periodoId_idx" ON "NotaDetalle"("periodoId");

-- AddForeignKey
ALTER TABLE "NotaDetalle" ADD CONSTRAINT "NotaDetalle_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NotaDetalle" ADD CONSTRAINT "NotaDetalle_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NotaDetalle" ADD CONSTRAINT "NotaDetalle_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "Periodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "NotaDetalle" ADD CONSTRAINT "NotaDetalle_notaMateriaPeriodoId_fkey" FOREIGN KEY ("notaMateriaPeriodoId") REFERENCES "NotaMateriaPeriodo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
