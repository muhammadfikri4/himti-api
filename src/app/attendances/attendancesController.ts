import { NextFunction, type Request, type Response } from 'express'
import { RequestWithAccessToken } from '../../interface/Request'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { createAttendanceSchema } from './attendancesRequest'
import { createAttendanceService, getAttendanceByIdService, getAttendanceService, getAttendancesService } from "./attendancesService"

export const createAttendanceController = async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {

    const file = req.file as Express.Multer.File
    const { userId } = req
    const { body } = req
    const combine = {
        ...body,
        image: file
    }

    const validate = createAttendanceSchema.validate(combine)
    if (validate.error) {
        next(new ErrorApp(validate.error.message.replace(/"/g, ''), 400, MESSAGE_CODE.BAD_REQUEST))
        return
    }

    const absensi = await createAttendanceService(combine, userId as string)

    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ABSENSI)
}

export const getAttendanceController = async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {

    const { query } = req
    const { userId } = req

    const absensi = await getAttendanceService({
        ...query,
      userId
    })
    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensi)
}

export const getAttendanceByIdController = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const absensi = await getAttendanceByIdService(Number(id))
    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensi)
}

export const getAttendancesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { meetingId } = req.params
    const { query } = req

    const absensies = await getAttendancesService({
        ...query,
        meetingId
    })
    if (absensies instanceof ErrorApp) {
        next(absensies)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensies)
}