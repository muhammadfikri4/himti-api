import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const createStrukturalSchema = Joi.object({
    anggotaId: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.ANGGOTA_ID,
    }),
    jabatan: Joi.string().required().messages({
        "any.required": MESSAGES.ERROR.REQUIRED.JABATAN,
    }),
    isActive: Joi.boolean().optional().messages({
        "any.boolean": MESSAGES.ERROR.INVALID.STATUS
    })
})

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