import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAnggotaSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME,
    }),
    nim: Joi.string().required().max(14).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NIM,
        "string.max": MESSAGES.ERROR.INVALID.NIM.LENGTH
    }),
    email: Joi.string().required().email().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL
    }),
    angkatanId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.ANGKATAN_ID
    }),
    isActive: Joi.boolean().optional().messages({
        "any.boolean": MESSAGES.ERROR.INVALID.STATUS
    })
})