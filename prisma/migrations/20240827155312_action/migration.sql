-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_sub_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_anggota_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_history" DROP CONSTRAINT "notification_history_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_history" DROP CONSTRAINT "notification_history_sub_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_history" DROP CONSTRAINT "notification_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_absensiId_fkey";

-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_userId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "Acara"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_sub_acara_id_fkey" FOREIGN KEY ("sub_acara_id") REFERENCES "SubAcara"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_absensiId_fkey" FOREIGN KEY ("absensiId") REFERENCES "Absensi"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "Acara"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_sub_acara_id_fkey" FOREIGN KEY ("sub_acara_id") REFERENCES "SubAcara"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
