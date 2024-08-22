-- DropIndex
DROP INDEX "User_email_anggota_id_idx";

-- DropIndex
DROP INDEX "User_id_key";

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
