import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME
    }),
    email: Joi.string().required().email().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL
    }),
    password: Joi.string().required().min(8).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.PASSWORD,
        "string.min": MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH
    }),
    nim: Joi.string().required().max(14).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NIM,
        "string.max": MESSAGES.ERROR.INVALID.NIM.LENGTH
    }),
    code: Joi.optional()
})
export const loginSchema = Joi.object({

    email: Joi.string().required().email().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.EMAIL,
        "string.email": MESSAGES.ERROR.INVALID.GLOBAL.EMAIL
    }),
    password: Joi.string().required().min(8).messages({
        "any.required": MESSAGES.ERROR.REQUIRED.PASSWORD,
        "string.min": MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH
    }),
})
export const validateOtpSchema = Joi.object({

    otpId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.OTP_ID,
    }),
    otp: Joi.number().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.OTP
    }),
})


export const requestOtpSchema = Joi.object()