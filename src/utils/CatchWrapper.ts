import { NextFunction, type Request, type Response } from "express";

export const CatchWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error) => {
            if (error) {
                next(error)
                return
            }
            next()
        });
    };
};