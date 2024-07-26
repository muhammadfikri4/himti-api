import { NextFunction, type Request, type Response } from "express";
import { HandleResponse } from "./HandleResponse";
import { ErrorApp } from "./HttpError";

export const HandlingError = (err: ErrorApp | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorApp) {
        return HandleResponse(res, err.statusCode, err.code, err.message)
    }
}