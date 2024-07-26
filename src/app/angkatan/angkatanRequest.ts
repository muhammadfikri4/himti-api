import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAngkatanSchema = Joi.object({
    year: Joi.number().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME,
        "any.number": MESSAGES.ERROR.INVALID.ANGKATAN
    }),
    isActive: Joi.boolean().optional().messages({
        "any.boolean": MESSAGES.ERROR.INVALID.STATUS
    })
})