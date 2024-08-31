import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createEventMeetingSchema } from "./eventMeetingRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createEventMeetingController } from "./eventMeetingController";

const route = Router()

route.post('/', validateRequest(createEventMeetingSchema), CatchWrapper(createEventMeetingController))

export default route