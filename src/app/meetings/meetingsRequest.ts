import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createMeetingSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME,
  }),
  description: Joi.string().optional().allow(null),
  startTime: Joi.date().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.START_TIME,
  }),
  endTime: Joi.date().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.END_TIME,
  }),
  eventMeetingId: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.EVENT_MEETING_ID,
  }),
});

export const updateMeetingSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": MESSAGES.ERROR.INVALID.NAME,
  }),
  description: Joi.string().optional().allow(null),
  startTime: Joi.date().optional().messages({
    "date.base": MESSAGES.ERROR.INVALID.START_TIME,
  }),
  endTime: Joi.date().optional().messages({
    "date.base": MESSAGES.ERROR.INVALID.END_TIME,
  }),
});
