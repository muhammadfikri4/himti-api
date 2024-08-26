-- DropForeignKey
ALTER TABLE "user_fcm" DROP CONSTRAINT "user_fcm_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_fcm" ADD CONSTRAINT "user_fcm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
