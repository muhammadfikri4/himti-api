import { NextFunction, type Request, type Response } from "express"
import { RequestWithAccessToken } from "../../interface/Request"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createMeetingService, getMeetingByIdService, getMeetingsByEventMeetingsIdService, getMeetingsService } from "./meetingsService"

export const createMeetingController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req

  const result = await createMeetingService(body)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.MEETING)
}

export const getMeetingByEventMeetingIdController = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {

  const { eventMeetingId } = req.params
  const { query, userId } = req
  const result = await getMeetingsByEventMeetingsIdService({
    ...query,
    eventMeetingId
  }, userId as string)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.MEETING.GET, result?.data, result?.meta)

}

export const getMeetingsController = async(
  req:RequestWithAccessToken,
  res:Response,
  next:NextFunction
) => {
  const {query, userId} = req
  const result = await getMeetingsService(query, userId as string)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.MEETING.GET, result?.data, result?.meta)
}

export const getMeetingByIdController = async(
  req:RequestWithAccessToken,
  res:Response,
  next:NextFunction
) => {
  const { userId} = req
  const { meetingId } = req.params
  const result = await getMeetingByIdService(meetingId, userId as string)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.MEETING.GET, result)
}