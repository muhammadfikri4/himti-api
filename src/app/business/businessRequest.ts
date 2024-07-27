import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createBusinessSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.TITLE,
    }),
    description: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.DESCRIPTION
    }),
    price: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.PRICE
    })
})