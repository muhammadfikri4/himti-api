import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import {
  createMeetingController,
  getMeetingByEventMeetingIdController,
  getMeetingByIdController,
  getMeetingsController,
  updateMeetingController,
} from "./meetingsController";
import { createMeetingSchema, updateMeetingSchema } from "./meetingsRequest";
import { VerifySuperAdmin } from "../../middleware/verifySuperAdmin";

const route = Router();

route.get("/", VerifyToken, CatchWrapper(getMeetingsController));
route.put(
  "/:meetingId",
  VerifySuperAdmin,
  validateRequest(updateMeetingSchema),
  CatchWrapper(updateMeetingController)
);
route.post(
  "/",
  validateRequest(createMeetingSchema),
  CatchWrapper(createMeetingController)
);
route.get("/:meetingId", VerifyToken, CatchWrapper(getMeetingByIdController));
route.get(
  "/event-meeting/:eventMeetingId",
  VerifyToken,
  CatchWrapper(getMeetingByEventMeetingIdController)
);

export default route;
