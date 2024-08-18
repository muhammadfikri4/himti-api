import { NextFunction, type Request, type Response } from "express";
import { RequestWithAccessToken } from "interface/Request";

export const CatchWrapper = (fn: (req: Request | RequestWithAccessToken, res: Response, next: NextFunction) => any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)?.catch((error: Error) => {
            if (error) {
                next(error)
                return
            }
            next()
        });
    };
};