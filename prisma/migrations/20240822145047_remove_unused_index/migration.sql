-- DropIndex
DROP INDEX "Anggota_angkatan_id_name_nim_created_at_idx";

-- CreateIndex
CREATE INDEX "Anggota_angkatan_id_idx" ON "Anggota"("angkatan_id");
