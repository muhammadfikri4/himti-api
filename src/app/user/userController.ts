import { Role } from '@prisma/client'
import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { createUserService, getUserService, getUsersService } from "./userService"

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    const { search, role, page, perPage } = req.query
    const users = await getUsersService({
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        role: role ? role as Role : undefined,
        search: search as string
    })
    if (users instanceof ErrorApp) {
        next(users)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER_DATA.GET, users.data, users.meta)
}

export const createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { body } = req

    const user = await createUserService(body)

    if (user instanceof ErrorApp) {
        next(user)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT)
}

export const getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params
    const result = await getUserService(userId)

    if (result instanceof ErrorApp) {
        next(result)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER_DATA.GET, result)
}