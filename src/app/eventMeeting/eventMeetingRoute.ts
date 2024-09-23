import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createEventMeetingController, getEventMeetingWithMeetingController, getEventMeetingsController } from "./eventMeetingController";
import { createEventMeetingSchema } from "./eventMeetingRequest";

const route = Router()

route.post('/', VerifyToken, validateRequest(createEventMeetingSchema), CatchWrapper(createEventMeetingController))
route.get('/', VerifyToken, CatchWrapper(getEventMeetingsController))
route.get('/meeting', VerifyToken, CatchWrapper(getEventMeetingWithMeetingController))

export default route