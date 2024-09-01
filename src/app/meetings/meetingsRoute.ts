import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createMeetingSchema } from "./meetingsRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createMeetingController, getMeetingByEventMeetingIdController } from "./meetingsController";

const route = Router()

route.post('/', validateRequest(createMeetingSchema), CatchWrapper(createMeetingController))
route.get('/event-meeting/:eventMeetingId', CatchWrapper(getMeetingByEventMeetingIdController))

export default route