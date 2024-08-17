import { NextFunction, Request, Response } from "express"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getNotificationService, sendNotificationService, sendSingleNotificationService } from "./notificationService"

export const sendNotificationController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, body, acaraId, subAcaraId } = req.body
    const notification = await sendNotificationService(title, body, acaraId, subAcaraId)

    if (notification instanceof ErrorApp) {
        next(notification)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.SEND_ALL)
}

export const sendSingleNotificationController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, body } = req.body
    const { fcm } = req.params
    const notification = await sendSingleNotificationService(title, body, fcm)

    if (notification instanceof ErrorApp) {
        next(notification)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.SEND_ALL)
}

export const getNotificationController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const notification = await getNotificationService()
    if (notification instanceof ErrorApp) {
        next(notification)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.GET, notification)
}