import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authDTO";
import { loginAdminService, loginService, registerService, requestOtpService, validateOtpService } from "./authService";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password, nim, code } = req.body

    const register = await registerService({ name, email, password, nim, code });

    if (register instanceof ErrorApp) {
        next(register)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT)
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    const login = await loginService({ email, password });
    if (login instanceof ErrorApp) {
        next(login)
        return
    }
    res.cookie("access_token", login, { httpOnly: true })
    HandleResponse<LoginAuthResponse>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, login as LoginAuthResponse)
}

export const loginAdminController = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body


    const login = await loginAdminService({ email, password });
    if (login instanceof ErrorApp) {
        next(login)
        return
    }
    res.cookie("access_token", login, { httpOnly: true })
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, login)
}



export const requestOtpController = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.replace("Bearer ", "")

    const otp = await requestOtpService(token as string)

    if (otp instanceof ErrorApp) {
        next(otp)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.OTP.SEND, otp)
}

export const validateOtpController = async (req: Request, res: Response, next: NextFunction) => {

    const { id, otp } = req.body

    const otps = await validateOtpService({ id, otp })

    if (otps instanceof ErrorApp) {
        next(otps)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.OTP.VERIFY, otps)
}