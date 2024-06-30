/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Acara` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Alumni` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Struktural` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Acara_id_key" ON "Acara"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_id_key" ON "Alumni"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Struktural_id_key" ON "Struktural"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
