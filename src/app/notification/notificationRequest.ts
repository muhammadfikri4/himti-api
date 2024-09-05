import Joi from "joi";
import { MESSAGES } from "utils/Messages";

export const sendNotificationSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.TITLE
  }),
  body: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.BODY
  }),
  eventId: Joi.string().optional().allow(null),
  eventMeetingId: Joi.string().optional().allow(null)
})