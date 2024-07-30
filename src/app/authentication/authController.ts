import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { random } from "../../utils/GeneratedRandomOTP";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { SendEmail } from "../../utils/MailerConfig";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authDTO";
import { loginAdminService, loginService, registerService } from "./authService";

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

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {

    const { name, email } = req.body

    await SendEmail(email, name, random)
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.OTP.SEND)
}