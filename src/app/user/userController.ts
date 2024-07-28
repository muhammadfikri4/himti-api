import { Role } from '@prisma/client'
import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { getUsersService } from "./userService"

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