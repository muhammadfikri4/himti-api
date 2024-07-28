import { NextFunction, type Request, type Response } from "express"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { HandleResponse } from "../../utils/HandleResponse"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createMerchandiseService, createServiceService, getMerchandiseService, getServiceService } from "./businessService"

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
export const createServiceController = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price } = req.body
    const file = req.file
    const service = await createServiceService({ title, description, price, image: file as File & Express.Multer.File })

    if (service instanceof ErrorApp) {
        next(service)
        return
    }

    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.MERCHANDISE)
}

export const getMerchandiseController = async (req: Request, res: Response, next: NextFunction) => {
    const { search, page, perPage } = req.query
    const merchandise = await getMerchandiseService({ search: search as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined })

    if (merchandise instanceof ErrorApp) {
        next(merchandise)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.MERCHANDISE.GET, merchandise.data, merchandise.meta)
}
export const getServiceController = async (req: Request, res: Response, next: NextFunction) => {
    const { search, page, perPage } = req.query
    const service = await getServiceService({ search: search as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined })

    if (service instanceof ErrorApp) {
        next(service)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.SERVICE.GET, service.data, service.meta)
}