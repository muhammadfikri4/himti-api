import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { createAttendanceService, getAttendanceByIdService, getAttendanceService, getAttendancesService } from "./attendancesService"
import { RequestWithAccessToken } from '../../interface/Request'
import {  createAttendanceSchema } from './attendancesRequest'

// export const createAbsensiAcaraController = async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {

//     const file = req.file
//     const {body} = req
// const {userId} = req
// const combine = { ...body, image:file }
//     const validate = createAbsensiAcaraSchema.validate(combine)
//     if (validate.error) {
//         next(new ErrorApp(validate.error.message.replace(/"/g, ''), 400, MESSAGE_CODE.BAD_REQUEST))
//         return
//     }
//     const absensi = await createAttendanceService(combine, userId as string)

//     if (absensi instanceof ErrorApp) {
//         next(absensi)
//         return
//     }
//     HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ABSENSI)
// }
export const createAttendanceController = async (req: RequestWithAccessToken, res: Response, next: NextFunction) => {

    const file = req.file as Express.Multer.File
    const {userId} = req
    const {body} = req
    const combine = {
        ...body,
        image: file
    }

    const validate = createAttendanceSchema.validate(combine)
    if(validate.error) {
        next(new ErrorApp(validate.error.message.replace(/"/g, ''),400, MESSAGE_CODE.BAD_REQUEST))
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

    const { acaraId, page, perPage } = req.query
    const {userId} = req

    const absensi = await getAttendanceService({
        acaraId: acaraId ? acaraId as string : undefined,
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined
    }, userId as string)
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
    const { subAcaraId } = req.params
    const { query } = req

    const absensies = await getAttendancesService({
        subAcaraId: subAcaraId ? subAcaraId : undefined,
        ...query
    })
    if (absensies instanceof ErrorApp) {
        next(absensies)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensies)
}