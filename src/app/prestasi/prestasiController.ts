import { NextFunction, type Request, type Response } from "express"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getPrestasiService } from "./prestasiService"


export const getPrestasiController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { query } = req
    const result = await getPrestasiService(query)

    if (result instanceof ErrorApp) {
        next(result)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRESTASI.GET, result?.data, result?.meta)
}