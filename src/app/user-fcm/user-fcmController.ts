import { NextFunction, Request, Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { getAllFCMUserService } from "./user-fcmService";

export const getAllFCMUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { query } = req
    const fcm = await getAllFCMUserService(query)
    if (fcm instanceof ErrorApp) {
        next(fcm)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, fcm)
}