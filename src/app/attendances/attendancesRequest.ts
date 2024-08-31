import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAttendanceSchema = Joi.object({
    subAcaraId: Joi.string().optional(),
    coordinate: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    absensiTime: Joi.string().optional().allow(null),
    image: Joi.any().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    })
})