/*
  Warnings:

  - You are about to alter the column `image` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `absensiTime` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `acara_id` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `address` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `coordinate` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `sub_acara_id` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `user_id` on the `Absensi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `name` on the `Acara` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image` on the `Acara` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `name` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to alter the column `nim` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `facebook` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `instagram` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `linkedin` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `twitter` on the `Anggota` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `year` on the `Angkatan` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `nidn` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `number_phone` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `lesson` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `image` on the `Prestasi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `title` on the `Prestasi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `timeString` on the `Prestasi` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `department_id` on the `Struktural` table. All the data in the column will be lost.
  - You are about to alter the column `image` on the `Struktural` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `anggota_id` on the `Struktural` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `name` on the `SubAcara` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image` on the `SubAcara` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `acaraId` on the `SubAcara` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
  - You are about to alter the column `nim` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `anggota_id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `user_id` on the `user_fcm` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(110)`.
  - You are about to alter the column `fcm_token` on the `user_fcm` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Alumni` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bussiness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Certificate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OTP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prestasi_anggota` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_sub_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_anggota_id_fkey";

-- DropForeignKey
ALTER TABLE "Certificate" DROP CONSTRAINT "Certificate_acaraId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_absensiId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_userId_fkey";

-- DropForeignKey
ALTER TABLE "Struktural" DROP CONSTRAINT "Struktural_anggota_id_fkey";

-- DropForeignKey
ALTER TABLE "SubAcara" DROP CONSTRAINT "SubAcara_acaraId_fkey";

-- DropForeignKey
ALTER TABLE "prestasi_anggota" DROP CONSTRAINT "prestasi_anggota_anggota_id_fkey";

-- DropForeignKey
ALTER TABLE "prestasi_anggota" DROP CONSTRAINT "prestasi_anggota_prestasi_id_fkey";

-- DropForeignKey
ALTER TABLE "user_fcm" DROP CONSTRAINT "user_fcm_user_id_fkey";

-- DropIndex
DROP INDEX "Absensi_user_id_acara_id_created_at_idx";

-- DropIndex
DROP INDEX "Acara_name_start_time_end_time_idx";

-- DropIndex
DROP INDEX "SubAcara_name_start_time_end_time_idx";

-- AlterTable
ALTER TABLE "Absensi" ALTER COLUMN "image" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "absensiTime" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "acara_id" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "coordinate" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "sub_acara_id" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(110);

-- AlterTable
ALTER TABLE "Acara" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Anggota" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "nim" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "facebook" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "instagram" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "linkedin" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "twitter" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Angkatan" ALTER COLUMN "year" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Dosen" ALTER COLUMN "nidn" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "number_phone" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "lesson" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Prestasi" ALTER COLUMN "image" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "timeDate" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "timeString" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "Struktural" DROP COLUMN "department_id",
ALTER COLUMN "image" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "anggota_id" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "SubAcara" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "end_time" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "start_time" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "acaraId" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(55),
ALTER COLUMN "nim" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "anggota_id" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(0),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(0);

-- AlterTable
ALTER TABLE "user_fcm" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(110),
ALTER COLUMN "fcm_token" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Alumni";

-- DropTable
DROP TABLE "Bussiness";

-- DropTable
DROP TABLE "Certificate";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "OTP";

-- DropTable
DROP TABLE "Point";

-- DropTable
DROP TABLE "prestasi_anggota";

-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(110) NOT NULL,
    "title" VARCHAR(110) NOT NULL,
    "description" TEXT,
    "price" VARCHAR(50) NOT NULL,
    "type" "BussinessType" DEFAULT 'MERCHANDISE',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "otp" VARCHAR(50) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "expired" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "point" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "absensiId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_id_key" ON "business"("id");

-- CreateIndex
CREATE UNIQUE INDEX "otps_id_key" ON "otps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "points_id_key" ON "points"("id");

-- CreateIndex
CREATE INDEX "Absensi_user_id_acara_id_idx" ON "Absensi"("user_id", "acara_id");

-- CreateIndex
CREATE INDEX "Acara_name_idx" ON "Acara"("name");

-- CreateIndex
CREATE INDEX "SubAcara_acaraId_idx" ON "SubAcara"("acaraId");

-- AddForeignKey
ALTER TABLE "user_fcm" ADD CONSTRAINT "user_fcm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Struktural" ADD CONSTRAINT "Struktural_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAcara" ADD CONSTRAINT "SubAcara_acaraId_fkey" FOREIGN KEY ("acaraId") REFERENCES "Acara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "Acara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_sub_acara_id_fkey" FOREIGN KEY ("sub_acara_id") REFERENCES "SubAcara"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_absensiId_fkey" FOREIGN KEY ("absensiId") REFERENCES "Absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
