// { nidn, name, email, numberPhone, lesson, isActive }

import Joi from "joi";
import { MESSAGES } from "utils/Messages";

export const createDosenSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME,
    }),
    nidn: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NIDN,
    }),
    email: Joi.string().required().email().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL,
    }),
    numberPhone: Joi.number().required(),
    lesson: Joi.string().required(),
    isActive: Joi.boolean().optional()
})