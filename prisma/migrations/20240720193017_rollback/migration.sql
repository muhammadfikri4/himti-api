/*
  Warnings:

  - You are about to drop the column `userId` on the `Absensi` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Acara` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Anggota` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `anggotaId` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Struktural` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Struktural` table. All the data in the column will be lost.
  - Added the required column `acara_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Alumni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Anggota` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anggota_id` to the `Struktural` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Struktural` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_userId_fkey";

-- DropForeignKey
ALTER TABLE "Struktural" DROP CONSTRAINT "Struktural_anggotaId_fkey";

-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "userId",
ADD COLUMN     "acara_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Acara" DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Anggota" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Struktural" DROP COLUMN "anggotaId",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "anggota_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Struktural" ADD CONSTRAINT "Struktural_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "Anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "Acara"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
