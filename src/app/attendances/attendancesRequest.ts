import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAttendanceSchema = Joi.object({
    meetingId: Joi.string().optional(),
    coordinate: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    attendanceTime: Joi.string().optional().allow(null),
    image: Joi.any().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    })
})