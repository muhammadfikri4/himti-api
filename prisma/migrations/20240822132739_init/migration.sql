/*
  Warnings:

  - You are about to drop the column `acaraId` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `isOpen` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `anggotaId` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Angkatan` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Angkatan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Angkatan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Dosen` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Dosen` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Dosen` table. All the data in the column will be lost.
  - You are about to drop the column `anggotaId` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `acara_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinate` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anggota_id` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anggota_id` to the `Struktural` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BussinessType" AS ENUM ('MERCHANDISE', 'SERVICE');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_acaraId_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_userId_fkey";

-- DropForeignKey
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_anggotaId_fkey";

-- DropForeignKey
ALTER TABLE "Struktural" DROP CONSTRAINT "Struktural_anggotaId_fkey";

-- DropIndex
DROP INDEX "Absensi_userId_acaraId_idx";

-- DropIndex
DROP INDEX "Acara_name_startTime_endTime_idx";

-- DropIndex
DROP INDEX "Anggota_angkatan_id_name_nim_idx";

-- DropIndex
DROP INDEX "Angkatan_year_idx";

-- DropIndex
DROP INDEX "Dosen_name_nidn_idx";

-- DropIndex
DROP INDEX "Struktural_anggotaId_idx";

-- DropIndex
DROP INDEX "User_name_nim_idx";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "acaraId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "absensiTime" TEXT,
ADD COLUMN     "acara_id" TEXT NOT NULL,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "coordinate" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sub_acara_id" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Acara" DROP COLUMN "createdAt",
DROP COLUMN "endTime",
DROP COLUMN "isOpen",
DROP COLUMN "startTime",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_open" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_open_absen" BOOLEAN DEFAULT true,
ADD COLUMN     "start_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "anggotaId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "anggota_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Anggota" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "is_active" BOOLEAN DEFAULT true,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "nim" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Angkatan" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Dosen" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "number_phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Struktural" DROP COLUMN "anggotaId",
DROP COLUMN "createdAt",
DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "isActive",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
DROP COLUMN "updatedAt",
ADD COLUMN     "anggota_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department_id" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "anggota_id" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_login" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "nim" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user_fcm" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "fcm_token" TEXT NOT NULL,

    CONSTRAINT "user_fcm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAcara" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "end_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "start_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "acaraId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubAcara_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestasi" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "timeDate" TIMESTAMP(3),
    "timeString" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prestasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bussiness" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "type" "BussinessType" DEFAULT 'MERCHANDISE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bussiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "expired" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "acaraId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prestasi_anggota" (
    "id" SERIAL NOT NULL,
    "anggota_id" TEXT NOT NULL,
    "prestasi_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prestasi_anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "point" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "absensiId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_history" (
    "id" TEXT NOT NULL,
    "acara_id" TEXT,
    "sub_acara_id" TEXT,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_fcm_id_key" ON "user_fcm"("id");

-- CreateIndex
CREATE INDEX "user_id" ON "user_fcm"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubAcara_id_key" ON "SubAcara"("id");

-- CreateIndex
CREATE INDEX "SubAcara_name_start_time_end_time_idx" ON "SubAcara"("name", "start_time", "end_time");

-- CreateIndex
CREATE UNIQUE INDEX "Prestasi_id_key" ON "Prestasi"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bussiness_id_key" ON "Bussiness"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_id_key" ON "OTP"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_id_key" ON "Certificate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "prestasi_anggota_id_key" ON "prestasi_anggota"("id");

-- CreateIndex
CREATE INDEX "prestasi_anggota_anggota_id_idx" ON "prestasi_anggota"("anggota_id");

-- CreateIndex
CREATE INDEX "prestasi_anggota_prestasi_id_idx" ON "prestasi_anggota"("prestasi_id");

-- CreateIndex
CREATE UNIQUE INDEX "Point_id_key" ON "Point"("id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_history_id_key" ON "notification_history"("id");

-- CreateIndex
CREATE INDEX "Absensi_user_id_acara_id_created_at_idx" ON "Absensi"("user_id", "acara_id", "created_at");

-- CreateIndex
CREATE INDEX "Acara_name_start_time_end_time_idx" ON "Acara"("name", "start_time", "end_time");

-- CreateIndex
CREATE INDEX "Anggota_angkatan_id_name_nim_created_at_idx" ON "Anggota"("angkatan_id", "name", "nim", "created_at");

-- CreateIndex
CREATE INDEX "Angkatan_year_created_at_idx" ON "Angkatan"("year", "created_at");

-- CreateIndex
CREATE INDEX "Dosen_name_nidn_created_at_idx" ON "Dosen"("name", "nidn", "created_at");

-- CreateIndex
CREATE INDEX "Struktural_anggota_id_idx" ON "Struktural"("anggota_id");

-- CreateIndex
CREATE INDEX "User_email_anggota_id_idx" ON "User"("email", "anggota_id");

-- AddForeignKey
ALTER TABLE "user_fcm" ADD CONSTRAINT "user_fcm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_acaraId_fkey" FOREIGN KEY ("acaraId") REFERENCES "Acara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestasi_anggota" ADD CONSTRAINT "prestasi_anggota_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prestasi_anggota" ADD CONSTRAINT "prestasi_anggota_prestasi_id_fkey" FOREIGN KEY ("prestasi_id") REFERENCES "Prestasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_absensiId_fkey" FOREIGN KEY ("absensiId") REFERENCES "Absensi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "Acara"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_sub_acara_id_fkey" FOREIGN KEY ("sub_acara_id") REFERENCES "SubAcara"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
