import { NextFunction, type Request, type Response } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { HandleResponse } from '../../utils/HandleResponse'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { getProfileService, updateProfileService } from "./profileService"

export const getProfileController = async (req: Request, res: Response, next: NextFunction) => {

    const bearerToken = req.headers.authorization?.replace("Bearer ", "")
    const profile = await getProfileService(bearerToken as string)

    if (profile instanceof ErrorApp) {
        next(profile)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PROFILE.GET, profile)
}

export const updateProfileController = async (req: Request, res: Response, next: NextFunction) => {

    const bearerToken = req.headers.authorization?.replace("Bearer ", "")
    const { name, email, nim, facebook, twitter, linkedin, instagram } = req.body
    const body = { name, email, nim, facebook, twitter, linkedin, instagram }
    const profile = await updateProfileService(bearerToken as string, body)
    if (profile instanceof ErrorApp) {
        next(profile)
        return
    }
    const [data, sosmed] = profile
    const { password, ...rest } = data
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PROFILE.UPDATE, { ...rest, ...sosmed })
}