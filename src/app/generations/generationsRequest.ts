import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAngkatanSchema = Joi.object({
    year: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME
    }),
    isActive: Joi.boolean().optional().messages({
        "any.boolean": MESSAGES.ERROR.INVALID.STATUS
    })
})