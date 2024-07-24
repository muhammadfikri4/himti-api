import { NextFunction, type Request, type Response } from 'express';
import Joi from "joi";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { HandleResponse } from "../utils/HandleResponse";

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const message = error.details[0].message;
            return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, message);
        }

        next();
    };
};