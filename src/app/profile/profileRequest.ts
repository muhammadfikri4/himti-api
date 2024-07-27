import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const updateProfileSchema = Joi.object({
    name: Joi.string().optional().messages({
        "any.string": MESSAGES.ERROR.INVALID.NAME,
    }),
    nim: Joi.number().optional().max(99999999999999).messages({
        "any.number": MESSAGES.ERROR.INVALID.NIM.FORMAT,
        "number.max": MESSAGES.ERROR.INVALID.NIM.LENGTH
    }),
    email: Joi.string().optional().email().messages({
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL
    }),
    instagram: Joi.optional(),
    facebook: Joi.optional(),
    twitter: Joi.optional(),
    linkedin: Joi.optional(),

})