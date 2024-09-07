import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createEventMeetingSchema } from "./eventMeetingRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createEventMeetingController, getEventMeetingWithMeetingController, getEventMeetingsController } from "./eventMeetingController";

const route = Router()

route.post('/', validateRequest(createEventMeetingSchema), CatchWrapper(createEventMeetingController))
route.get('/', CatchWrapper(getEventMeetingsController))
route.get('/meeting', CatchWrapper(getEventMeetingWithMeetingController))

export default route