import { NextFunction, Request, Response } from "express"
import { RequestWithAccessToken } from "../../interface/Request"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getNotificationService, readNotificationService, sendNotificationByFcmIdService, sendNotificationService, sendSingleNotificationService } from "./notificationService"

export const sendNotificationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, body, eventId, meetingId } = req.body
  const notification = await sendNotificationService(title, body, eventId, meetingId)

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
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req
  const notification = await getNotificationService(userId as string)
  if (notification instanceof ErrorApp) {
    next(notification)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.GET, notification)
}

export const readNotificationController = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { notificationId } = req.params
  const { userId } = req
  const notification = await readNotificationService(notificationId as string, userId as string)
  if (notification instanceof ErrorApp) {
    next(notification)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.READ)
}

export const sendNotificationByFcmIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fcmId } = req.params
  const { body } = req

  const notification = await sendNotificationByFcmIdService(
    fcmId,
    body
  )
  if (notification instanceof ErrorApp) {
    next(notification)
    return
  }

  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.NOTIFICATION.SEND)
}