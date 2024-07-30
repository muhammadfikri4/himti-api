import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const updateProfileSchema = Joi.object({
    name: Joi.string().optional().messages({
        "any.string": MESSAGES.ERROR.INVALID.NAME,
    }),
    nim: Joi.optional(),
    email: Joi.string().optional().messages({
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL
    }),
    instagram: Joi.optional(),
    facebook: Joi.optional(),
    twitter: Joi.optional(),
    linkedin: Joi.optional(),

})

export const updatePasswordSchema = Joi.object({
    key: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.OTP_ID
    }),
    oldPassword: Joi.string().required().min(99999999).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.OLD_PASSWORD,
        "string.min": MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH
    }),
    newPassword: Joi.string().required().min(99999999).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NEW_PASSWORD,
        "string.min": MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH
    }),
})