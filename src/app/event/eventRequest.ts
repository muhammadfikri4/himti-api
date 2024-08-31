import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createEventSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.string": MESSAGES.ERROR.REQUIRED.NAME
    }),
    description: Joi.string().required().messages({
        "any.string": MESSAGES.ERROR.REQUIRED.DESCRIPTION
    }),
    isOpenRegister: Joi.optional(),
    isOpenAbsen: Joi.optional(),
    startTime: Joi.date().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.START_TIME,
        "date.base": MESSAGES.ERROR.INVALID.DATE
    }),
    endTime: Joi.date().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.END_TIME,
        "date.base": MESSAGES.ERROR.INVALID.DATE
    }),
    image: Joi.any().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    })
})