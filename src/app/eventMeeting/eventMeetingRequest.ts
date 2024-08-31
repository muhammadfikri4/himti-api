import Joi from "joi";
import { MESSAGES } from "utils/Messages";

export const createEventMeetingSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.ERROR.REQUIRED.NAME
  }),
  description: Joi.string().optional().allow(null)
})