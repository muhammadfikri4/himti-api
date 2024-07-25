import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "./ErrorCode";
import { HandleResponse } from "./HandleResponse";
import { MESSAGES } from "./Messages";

export const CatchWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error) => {
            if (error) {
                HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR)
            }
            next()
        });
    };
};