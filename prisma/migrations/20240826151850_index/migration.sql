-- DropIndex
DROP INDEX "Absensi_user_id_acara_id_idx";

-- CreateIndex
CREATE INDEX "absensi_fk_1" ON "Absensi"("user_id");

-- CreateIndex
CREATE INDEX "absensi_fk_2" ON "Absensi"("acara_id");

-- CreateIndex
CREATE INDEX "absensi_fk_3" ON "Absensi"("sub_acara_id");

-- CreateIndex
CREATE INDEX "user_fk_1" ON "User"("anggota_id");

-- RenameIndex
ALTER INDEX "Acara_name_idx" RENAME TO "name";

-- RenameIndex
ALTER INDEX "Anggota_angkatan_id_idx" RENAME TO "anggota_fk_1";

-- RenameIndex
ALTER INDEX "Struktural_anggota_id_idx" RENAME TO "struktural_fk_1";

-- RenameIndex
ALTER INDEX "SubAcara_acaraId_idx" RENAME TO "sub_acara_fk_1";

-- RenameIndex
ALTER INDEX "notification_history_acara_id_idx" RENAME TO "notification_history_fk_1";

-- RenameIndex
ALTER INDEX "notification_history_sub_acara_id_idx" RENAME TO "notification_history_fk_3";

-- RenameIndex
ALTER INDEX "notification_history_user_id_idx" RENAME TO "notification_history_fk_2";

-- RenameIndex
ALTER INDEX "points_absensiId_idx" RENAME TO "point_fk_2";

-- RenameIndex
ALTER INDEX "points_userId_idx" RENAME TO "point_fk_1";

-- RenameIndex
ALTER INDEX "user_id" RENAME TO "user_fcm_fk_1";
