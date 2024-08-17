import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { getNotificationController, sendNotificationController, sendSingleNotificationController } from "./notificationController";

const route = Router()

route.post("/", CatchWrapper(sendNotificationController))
route.post("/:fcm", CatchWrapper(sendSingleNotificationController))
route.get('/', CatchWrapper(getNotificationController))

export default route