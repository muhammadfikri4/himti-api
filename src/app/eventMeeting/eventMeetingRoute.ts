import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import {
  createEventMeetingController,
  deleteEventMeetingController,
  getEventMeetingByIdController,
  getEventMeetingWithMeetingController,
  getEventMeetingsController,
  updateEventMeetingController,
} from "./eventMeetingController";
import {
  createEventMeetingSchema,
  updateEventMeetingSchema,
} from "./eventMeetingRequest";

const route = Router();

route.post(
  "/",
  VerifyToken,
  validateRequest(createEventMeetingSchema),
  CatchWrapper(createEventMeetingController)
);
route.put(
  "/:eventMeetingId",
  VerifyToken,
  validateRequest(updateEventMeetingSchema),
  CatchWrapper(updateEventMeetingController)
);
route.get("/", VerifyToken, CatchWrapper(getEventMeetingsController));
route.get(
  "/meeting",
  VerifyToken,
  CatchWrapper(getEventMeetingWithMeetingController)
);
route.get(
  "/:eventMeetingId",
  VerifyToken,
  CatchWrapper(getEventMeetingByIdController)
);
route.delete(
  "/:eventMeetingId",
  VerifyToken,
  CatchWrapper(deleteEventMeetingController)
);

export default route;
