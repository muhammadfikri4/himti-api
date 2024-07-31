import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createSubAcaraSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME
    }),
    acaraId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.NAME
    }),
    description: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.DESCRIPTION
    }),
    isOpen: Joi.optional(),
    startTime: Joi.optional(),
    endTime: Joi.optional()
})

export const updateSubAcaraSchema = Joi.object({
    name: Joi.optional(),
    description: Joi.string().optional(),
    isOpenRegister: Joi.optional(),
    isOpenAbsen: Joi.optional(),
    startTime: Joi.optional(),
    endTime: Joi.optional()
})