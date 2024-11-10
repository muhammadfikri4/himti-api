-- CreateEnum
CREATE TYPE "Jabatan" AS ENUM ('KETUA_HIMPUNAN', 'WAKIL_KETUA_HIMPUNAN', 'BENDAHARA', 'SEKRETARIS', 'KETUA_DEPARTMENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER', 'ANGGOTA');

-- CreateEnum
CREATE TYPE "BussinessType" AS ENUM ('MERCHANDISE', 'SERVICE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(110) NOT NULL,
    "password" VARCHAR(110) NOT NULL,
    "role" "Role" DEFAULT 'ADMIN',
    "nim" VARCHAR(20),
    "member_id" VARCHAR(110),
    "photo" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "is_login" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_fcm" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(110) NOT NULL,
    "fcm_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_fcm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturer" (
    "id" TEXT NOT NULL,
    "nidn" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50),
    "number_phone" VARCHAR(50),
    "lesson" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generation" (
    "id" TEXT NOT NULL,
    "year" VARCHAR(20) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nim" VARCHAR(110),
    "generation_id" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "instagram" VARCHAR(50),
    "facebook" VARCHAR(50),
    "twitter" VARCHAR(50),
    "linkedin" VARCHAR(50),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structural" (
    "id" TEXT NOT NULL,
    "jabatan" "Jabatan" NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "member_id" VARCHAR(110) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "structural_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image" VARCHAR(255) NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "end_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "start_time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_meeting" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "description" VARCHAR(500),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "event_meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMP(0) NOT NULL,
    "end_time" TIMESTAMP(0) NOT NULL,
    "event_meeting_id" VARCHAR(110) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "resume" TEXT,

    CONSTRAINT "meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(110) NOT NULL,
    "meeting_id" VARCHAR(110) NOT NULL,
    "event_meeting_id" VARCHAR(110) NOT NULL,
    "coordinate" VARCHAR(110) NOT NULL,
    "address" VARCHAR(255),
    "attendance_time" VARCHAR(150),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "time_date" TIMESTAMP(0),
    "time_string" VARCHAR(50),
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(110) NOT NULL,
    "description" TEXT,
    "price" VARCHAR(50) NOT NULL,
    "type" "BussinessType" DEFAULT 'MERCHANDISE',
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "otp" VARCHAR(500) NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "expired" TIMESTAMP(0),
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points" (
    "id" SERIAL NOT NULL,
    "point" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "attendanceId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_history" (
    "id" TEXT NOT NULL,
    "acara_id" VARCHAR(110),
    "user_id" VARCHAR(110) NOT NULL,
    "meeting_id" VARCHAR(110),
    "title" VARCHAR(155) NOT NULL,
    "body" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "notification_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version" (
    "id" SERIAL NOT NULL,
    "android_version" VARCHAR(110),
    "ios_version" VARCHAR(110),
    "play_store_link" VARCHAR(300),
    "app_store_link" VARCHAR(300),
    "notes" VARCHAR(500),

    CONSTRAINT "version_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_member_id_key" ON "user"("member_id");

-- CreateIndex
CREATE INDEX "user_fk_1" ON "user"("member_id");

-- CreateIndex
CREATE INDEX "user_fk_2" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_fcm_id_key" ON "user_fcm"("id");

-- CreateIndex
CREATE INDEX "user_fcm_fk_1" ON "user_fcm"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "lecturer_nidn_key" ON "lecturer"("nidn");

-- CreateIndex
CREATE UNIQUE INDEX "lecturer_email_key" ON "lecturer"("email");

-- CreateIndex
CREATE INDEX "lecturer_fk_1" ON "lecturer"("name");

-- CreateIndex
CREATE INDEX "lecturer_fk_2" ON "lecturer"("nidn");

-- CreateIndex
CREATE INDEX "generation_fk_1" ON "generation"("year");

-- CreateIndex
CREATE UNIQUE INDEX "member_nim_key" ON "member"("nim");

-- CreateIndex
CREATE INDEX "member_fk_1" ON "member"("generation_id");

-- CreateIndex
CREATE UNIQUE INDEX "structural_id_key" ON "structural"("id");

-- CreateIndex
CREATE INDEX "struktural_fk_1" ON "structural"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_id_key" ON "event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "event_meeting_id_key" ON "event_meeting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_id_key" ON "meeting"("id");

-- CreateIndex
CREATE INDEX "meeting_fk_1" ON "meeting"("event_meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_id_key" ON "attendance"("id");

-- CreateIndex
CREATE INDEX "attendance_fk_1" ON "attendance"("user_id");

-- CreateIndex
CREATE INDEX "attendance_fk_2" ON "attendance"("meeting_id");

-- CreateIndex
CREATE INDEX "attendance_fk_3" ON "attendance"("event_meeting_id");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_id_key" ON "achievement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "business_id_key" ON "business"("id");

-- CreateIndex
CREATE UNIQUE INDEX "otps_id_key" ON "otps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "points_id_key" ON "points"("id");

-- CreateIndex
CREATE INDEX "point_fk_1" ON "points"("userId");

-- CreateIndex
CREATE INDEX "point_fk_2" ON "points"("attendanceId");

-- CreateIndex
CREATE UNIQUE INDEX "notification_history_id_key" ON "notification_history"("id");

-- CreateIndex
CREATE INDEX "notification_history_fk_1" ON "notification_history"("acara_id");

-- CreateIndex
CREATE INDEX "notification_history_fk_2" ON "notification_history"("user_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_fcm" ADD CONSTRAINT "user_fcm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_generation_id_fkey" FOREIGN KEY ("generation_id") REFERENCES "generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structural" ADD CONSTRAINT "structural_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_event_meeting_id_fkey" FOREIGN KEY ("event_meeting_id") REFERENCES "event_meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_event_meeting_id_fkey" FOREIGN KEY ("event_meeting_id") REFERENCES "event_meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "attendance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_acara_id_fkey" FOREIGN KEY ("acara_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notification_history" ADD CONSTRAINT "notification_history_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
