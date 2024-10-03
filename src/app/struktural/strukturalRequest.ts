import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createStrukturalSchema = Joi.object({
    memberId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.ANGGOTA_ID,
    }),
    jabatan: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.JABATAN,
    }),
    isActive: Joi.boolean().optional().messages({
        "any.boolean": MESSAGES.ERROR.INVALID.STATUS
    }),
    image: Joi.any().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.IMAGE
    })
})