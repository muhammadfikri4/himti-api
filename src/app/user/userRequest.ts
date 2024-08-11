import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createUserSchema = Joi.object({
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
})