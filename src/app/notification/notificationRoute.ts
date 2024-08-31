// import { Router } from "express";
// import { VerifyToken } from "../../middleware/verifyToken";
// import { CatchWrapper } from "../../utils/CatchWrapper";
// import { getNotificationController, readNotificationController, sendNotificationByFcmIdController, sendNotificationController, sendSingleNotificationController } from "./notificationController";

// const route = Router()

// route.post("/", CatchWrapper(sendNotificationController))
// route.post("/:fcm", CatchWrapper(sendSingleNotificationController))
// route.post("/fcm/:fcmId", CatchWrapper(sendNotificationByFcmIdController))
// route.get('/', VerifyToken, CatchWrapper(getNotificationController))
// route.put('/read/:notificationId', VerifyToken, CatchWrapper(readNotificationController))

// export default route