-- AlterTable
ALTER TABLE "otps" ALTER COLUMN "otp" SET DATA TYPE VARCHAR(500);

-- CreateTable
CREATE TABLE "Version" (
    "id" SERIAL NOT NULL,
    "android_version" TEXT,
    "ios_version" TEXT,
    "play_store_link" TEXT,
    "app_store_link" TEXT,
    "notes" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Version_id_key" ON "Version"("id");
