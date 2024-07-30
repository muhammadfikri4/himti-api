import { NextFunction, type Request, type Response } from "express";

export const CatchWrapper = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error: Error) => {
            if (error) {
                next(error)
                return
            }
            next()
        });
    };
};