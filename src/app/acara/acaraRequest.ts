import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAcaraSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.string": MESSAGES.ERROR.REQUIRED.NAME
    }),
    description: Joi.string().required().messages({
        "any.string": MESSAGES.ERROR.REQUIRED.DESCRIPTION
    }),
    isOpen: Joi.optional(),
    startTime: Joi.optional(),
    endTime: Joi.optional()
})