import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createMeetingController, getMeetingByEventMeetingIdController, getMeetingByIdController, getMeetingsController } from "./meetingsController";
import { createMeetingSchema } from "./meetingsRequest";

const route = Router()

route.get('/', VerifyToken, CatchWrapper(getMeetingsController))
route.post('/', validateRequest(createMeetingSchema), CatchWrapper(createMeetingController))
route.get('/:meetingId', VerifyToken, CatchWrapper(getMeetingByIdController))
route.get('/event-meeting/:eventMeetingId', VerifyToken, CatchWrapper(getMeetingByEventMeetingIdController))

export default route