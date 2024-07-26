import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { createAbsensiService, getAbsensiService } from "./absensiService"

export const createAbsensiController = async (req: Request, res: Response, next: NextFunction) => {
    const { acaraId, coordinate } = req.body
    const image = req.file?.path as string
    const token = req.headers.authorization?.replace("Bearer ", "")

    const absensi = await createAbsensiService({ acaraId, image, coordinate }, token as string)

    if (absensi instanceof ErrorApp) {
        next(absensi)
        return

        // return HandleResponse(res, absensi.statusCode, absensi.code, absensi.message)
    }

    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ABSENSI)
}

export const getAbsensiController = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    const absensi = await getAbsensiService(token as string)
    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
        // return HandleResponse(res, absensi.statusCode, absensi.code, absensi.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensi)
}