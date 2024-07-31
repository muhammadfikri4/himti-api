import { NextFunction, type Request, type Response } from 'express';
import Joi from "joi";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { HandleResponse } from "../utils/HandleResponse";

export const validateRequest = (body: Joi.ObjectSchema, file?: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const bv = body.validate(req.body, { abortEarly: false });
        const fv = file ? file.validate(req.file, { abortEarly: false }) : { error: null }

        const errors = []

        if (fv.error) {
            errors.push(...fv.error.details.map(i => i.message.replace(/"/g, '')))
        }

        if (bv.error) {
            errors.push(...bv.error.details.map(i => i.message.replace(/"/g, '')))

        }

        if (errors.length) {

            return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, errors[0]);
        }

        next();
    };
};