-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `password` VARCHAR(110) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'USER', 'ANGGOTA') NULL DEFAULT 'ADMIN',
    `nim` VARCHAR(20) NULL,
    `member_id` VARCHAR(110) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL,
    `is_login` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_fk_1`(`member_id`),
    INDEX `user_fk_2`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_fcm` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(110) NOT NULL,
    `fcm_token` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `user_fcm_id_key`(`id`),
    INDEX `user_fcm_fk_1`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lecturer` (
    `id` VARCHAR(191) NOT NULL,
    `nidn` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(50) NULL,
    `number_phone` VARCHAR(50) NULL,
    `lesson` VARCHAR(50) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `lecturer_nidn_key`(`nidn`),
    UNIQUE INDEX `lecturer_email_key`(`email`),
    INDEX `lecturer_fk_1`(`name`),
    INDEX `lecturer_fk_2`(`nidn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generation` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(20) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `generation_fk_1`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(55) NULL,
    `nim` VARCHAR(110) NULL,
    `generation_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `instagram` VARCHAR(50) NULL,
    `facebook` VARCHAR(50) NULL,
    `twitter` VARCHAR(50) NULL,
    `linkedin` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `member_nim_key`(`nim`),
    INDEX `member_fk_1`(`generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `structural` (
    `id` VARCHAR(191) NOT NULL,
    `jabatan` ENUM('KETUA_HIMPUNAN', 'WAKIL_KETUA_HIMPUNAN', 'BENDAHARA', 'SEKRETARIS', 'KETUA_DEPARTMENT') NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `member_id` VARCHAR(110) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `structural_id_key`(`id`),
    INDEX `struktural_fk_1`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `end_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `start_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `event_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_meeting` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `description` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `event_meeting_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meeting` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(155) NOT NULL,
    `description` VARCHAR(500) NULL,
    `start_time` TIMESTAMP(0) NOT NULL,
    `end_time` TIMESTAMP(0) NOT NULL,
    `event_meeting_id` VARCHAR(110) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `resume` VARCHAR(650) NULL,

    UNIQUE INDEX `meeting_id_key`(`id`),
    INDEX `meeting_fk_1`(`event_meeting_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(110) NOT NULL,
    `meeting_id` VARCHAR(110) NOT NULL,
    `event_meeting_id` VARCHAR(110) NOT NULL,
    `coordinate` VARCHAR(110) NOT NULL,
    `address` VARCHAR(255) NULL,
    `attendance_time` VARCHAR(150) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `attendance_id_key`(`id`),
    INDEX `attendance_fk_1`(`user_id`),
    INDEX `attendance_fk_2`(`meeting_id`),
    INDEX `attendance_fk_3`(`event_meeting_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `time_date` TIMESTAMP(0) NULL,
    `time_string` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `achievement_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(255) NOT NULL,
    `title` VARCHAR(110) NOT NULL,
    `description` TEXT NULL,
    `price` VARCHAR(50) NOT NULL,
    `type` ENUM('MERCHANDISE', 'SERVICE') NULL DEFAULT 'MERCHANDISE',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `business_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otps` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `otp` VARCHAR(500) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `expired` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP NULL,

    UNIQUE INDEX `otps_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `point` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `attendanceId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `points_id_key`(`id`),
    INDEX `point_fk_1`(`userId`),
    INDEX `point_fk_2`(`attendanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_history` (
    `id` VARCHAR(191) NOT NULL,
    `acara_id` VARCHAR(110) NULL,
    `user_id` VARCHAR(110) NOT NULL,
    `event_meeting_id` VARCHAR(110) NULL,
    `title` VARCHAR(155) NOT NULL,
    `body` VARCHAR(500) NOT NULL,
    `isRead` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `notification_history_id_key`(`id`),
    INDEX `notification_history_fk_1`(`acara_id`),
    INDEX `notification_history_fk_2`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `android_version` VARCHAR(110) NULL,
    `ios_version` VARCHAR(110) NULL,
    `play_store_link` VARCHAR(300) NULL,
    `app_store_link` VARCHAR(300) NULL,
    `notes` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_fcm` ADD CONSTRAINT `user_fcm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `member` ADD CONSTRAINT `member_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `structural` ADD CONSTRAINT `structural_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `meeting` ADD CONSTRAINT `meeting_event_meeting_id_fkey` FOREIGN KEY (`event_meeting_id`) REFERENCES `event_meeting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_meeting_id_fkey` FOREIGN KEY (`meeting_id`) REFERENCES `meeting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_event_meeting_id_fkey` FOREIGN KEY (`event_meeting_id`) REFERENCES `event_meeting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `points_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `attendance`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_history` ADD CONSTRAINT `notification_history_acara_id_fkey` FOREIGN KEY (`acara_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_history` ADD CONSTRAINT `notification_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notification_history` ADD CONSTRAINT `notification_history_event_meeting_id_fkey` FOREIGN KEY (`event_meeting_id`) REFERENCES `event_meeting`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
