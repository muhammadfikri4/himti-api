import { NextFunction, type Response, type Request } from "express"
import { createEventMeetingService, getEventMeetingWithMeetingService, getEventMeetingsService } from "./eventMeetingService"
import { ErrorApp } from "../../utils/HttpError"
import { HandleResponse } from "../../utils/HandleResponse"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { MESSAGES } from "../../utils/Messages"
import { RequestWithAccessToken } from "interface/Request"

export const createEventMeetingController = async(
  req:Request,
  res:Response,
  next:NextFunction
) => {
  const {body} = req

  const result = await createEventMeetingService(body)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.EVENT_MEETING)
}

export const getEventMeetingsController = async(
  req:Request,
  res:Response,
  next:NextFunction
) => {
  const {query} = req
  const result = await getEventMeetingsService(query)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.EVENT_MEETING.GET, result?.data, result?.meta)
}

export const getEventMeetingWithMeetingController = async(
  req:RequestWithAccessToken,
  res:Response,
  next:NextFunction
) => {

  const {query, userId} = req
console.log({userId})
  const result = await getEventMeetingWithMeetingService(query, userId as string)

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.EVENT_MEETING.GET, result?.data, result?.meta)
}