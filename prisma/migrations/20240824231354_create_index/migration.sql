-- CreateIndex
CREATE INDEX "notification_history_acara_id_idx" ON "notification_history"("acara_id");

-- CreateIndex
CREATE INDEX "notification_history_user_id_idx" ON "notification_history"("user_id");

-- CreateIndex
CREATE INDEX "notification_history_sub_acara_id_idx" ON "notification_history"("sub_acara_id");

-- CreateIndex
CREATE INDEX "points_userId_idx" ON "points"("userId");

-- CreateIndex
CREATE INDEX "points_absensiId_idx" ON "points"("absensiId");
