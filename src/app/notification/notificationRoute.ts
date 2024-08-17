import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { getNotificationController, sendNotificationController, sendSingleNotificationController } from "./notificationController";

const route = Router()

route.post("/", CatchWrapper(sendNotificationController))
route.post("/:fcm", CatchWrapper(sendSingleNotificationController))
route.get('/', VerifyToken, CatchWrapper(getNotificationController))

export default route