-- AddColumn maxGradoAlcanzadoId to User
ALTER TABLE "User" ADD COLUMN "maxGradoAlcanzadoId" INTEGER;

-- Add foreign key constraint
ALTER TABLE "User" ADD CONSTRAINT "User_maxGradoAlcanzadoId_fkey" FOREIGN KEY ("maxGradoAlcanzadoId") REFERENCES "Grado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
