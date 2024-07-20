/*
  Warnings:

  - You are about to drop the column `acara_id` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `anggota_id` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `anggota_id` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Struktural` table. All the data in the column will be lost.
  - Added the required column `acaraId` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anggotaId` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Anggota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anggotaId` to the `Struktural` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Struktural` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_acara_id_fkey";

-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Alumni" DROP CONSTRAINT "Alumni_anggota_id_fkey";

-- DropForeignKey
ALTER TABLE "Struktural" DROP CONSTRAINT "Struktural_anggota_id_fkey";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "acara_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "acaraId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "anggota_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "anggotaId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Anggota" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Struktural" DROP COLUMN "anggota_id",
DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "anggotaId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Struktural" ADD CONSTRAINT "Struktural_anggotaId_fkey" FOREIGN KEY ("anggotaId") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_acaraId_fkey" FOREIGN KEY ("acaraId") REFERENCES "Acara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
