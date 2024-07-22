-- CreateIndex
CREATE INDEX "Absensi_userId_acaraId_idx" ON "Absensi"("userId", "acaraId");

-- CreateIndex
CREATE INDEX "Acara_name_startTime_endTime_idx" ON "Acara"("name", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "Anggota_angkatan_id_name_nim_idx" ON "Anggota"("angkatan_id", "name", "nim");

-- CreateIndex
CREATE INDEX "Angkatan_year_idx" ON "Angkatan"("year");

-- CreateIndex
CREATE INDEX "Dosen_name_nidn_idx" ON "Dosen"("name", "nidn");

-- CreateIndex
CREATE INDEX "Struktural_anggotaId_idx" ON "Struktural"("anggotaId");

-- CreateIndex
CREATE INDEX "User_name_nim_idx" ON "User"("name", "nim");
