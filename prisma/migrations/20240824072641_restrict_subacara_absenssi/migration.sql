-- DropForeignKey
ALTER TABLE "SubAcara" DROP CONSTRAINT "SubAcara_acaraId_fkey";

-- AddForeignKey
ALTER TABLE "SubAcara" ADD CONSTRAINT "SubAcara_acaraId_fkey" FOREIGN KEY ("acaraId") REFERENCES "Acara"("id") ON DELETE CASCADE ON UPDATE CASCADE;
