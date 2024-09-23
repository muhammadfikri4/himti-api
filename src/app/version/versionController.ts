import { NextFunction, Request, Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { getVersionService, updateVersionService } from "./versionService";

export const updateVersionController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { body } = req
    const { versionId } = req.params
    const version = await updateVersionService(Number(versionId), body)
    if (version instanceof ErrorApp) {
        next(version)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VERSION.UPDATE)
}

export const getVersionController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const version = await getVersionService()

    if (version instanceof ErrorApp) {
        next(version)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VERSION.GET, version)
}