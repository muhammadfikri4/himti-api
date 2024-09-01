import { NextFunction, type Request, type Response } from "express"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createMeetingService, getMeetingsByEventMeetingsIdService } from "./meetingsService"

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

export const getMeetingByEventMeetingIdController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { eventMeetingId } = req.params
  const {query} = req
  const result = await getMeetingsByEventMeetingsIdService({
    ...query,
    eventMeetingId
  })

  if (result instanceof ErrorApp) {
    next(result)
    return
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.MEETING.GET, result?.data, result?.meta)

}