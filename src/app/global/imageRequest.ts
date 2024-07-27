import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const imageSchema = Joi.object({

    fieldname: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    originalname: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    encoding: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    mimetype: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    path: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    size: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
    filename: Joi.required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    }),
})