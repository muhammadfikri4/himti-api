/*
  Warnings:

  - You are about to alter the column `updated_at` on the `otps` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `meeting` MODIFY `description` LONGTEXT NULL,
    MODIFY `resume` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `otps` MODIFY `updated_at` TIMESTAMP NULL;
