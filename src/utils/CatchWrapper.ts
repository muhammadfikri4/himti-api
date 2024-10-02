import { NextFunction, type Request, type Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CatchWrapper = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
