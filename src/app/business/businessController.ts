import { NextFunction, type Request, type Response } from "express"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createMerchandiseService } from "./businessService"

export const createMerchandiseController = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price } = req.body
    const file = req.file
    const merchandise = await createMerchandiseService({ title, description, price, image: file as File & Express.Multer.File })

    if (merchandise instanceof ErrorApp) {
        next(merchandise)
        return
    }

    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.MERCHANDISE)
}