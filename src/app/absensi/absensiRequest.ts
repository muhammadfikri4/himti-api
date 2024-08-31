import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createAbsensiAcaraSchema = Joi.object({
    acaraId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.ACARA_ID
    }),
    coordinate: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.COORDINATE
    }),
    address: Joi.string().optional().allow(null)
})
export const createAbsensiSubAcaraSchema = Joi.object({
    subAcaraId: Joi.string().optional(),
    coordinate: Joi.string().optional().allow(null),
    address: Joi.string().optional().allow(null),
    absensiTime: Joi.string().optional().allow(null),
    image: Joi.any().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    })
})