-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE SET NULL ON UPDATE CASCADE;
