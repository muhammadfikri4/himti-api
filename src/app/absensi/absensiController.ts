import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { createAbsensiAcaraService, createAbsensiSubAcaraService, getAbsensiService } from "./absensiService"

export const createAbsensiAcaraController = async (req: Request, res: Response, next: NextFunction) => {
    const { acaraId, coordinate, address } = req.body
    const image = req.file?.path as string
    const token = req.headers.authorization?.replace("Bearer ", "")

    const absensi = await createAbsensiAcaraService({ acaraId, image, coordinate, address }, token as string)

    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ABSENSI)
}
export const createAbsensiSubAcaraController = async (req: Request, res: Response, next: NextFunction) => {
    const { subAcaraId, coordinate, address } = req.body
    const image = req.file?.path as string
    const token = req.headers.authorization?.replace("Bearer ", "")

    const absensi = await createAbsensiSubAcaraService({ subAcaraId, image, coordinate, address }, token as string)

    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ABSENSI)
}

export const getAbsensiController = async (req: Request, res: Response, next: NextFunction) => {

    const { acaraId, subAcaraId, page, perPage } = req.query

    const token = req.headers.authorization?.replace("Bearer ", "")
    const absensi = await getAbsensiService({
        acaraId: acaraId ? acaraId as string : undefined,
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        subAcaraId: subAcaraId ? subAcaraId as string : undefined
    }, token as string)
    if (absensi instanceof ErrorApp) {
        next(absensi)
        return
        // return HandleResponse(res, absensi.statusCode, absensi.code, absensi.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ABSENSI.GET, absensi)
}