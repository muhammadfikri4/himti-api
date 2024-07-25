import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authDTO";
import { loginService, registerService } from "./authService";

export const registerController = async (req: Request, res: Response) => {

    const { name, email, password, nim } = req.body

    const register = await registerService({ name, email, password, nim });

    if (register instanceof ErrorApp) {
        return HandleResponse(res, register.statusCode, register.code, register.message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT)
}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body


    const login = await loginService({ email, password });
    if (login instanceof ErrorApp) {
        return HandleResponse(res, login.statusCode, login.code, login.message)
    }
    res.cookie("access_token", login, { httpOnly: true })
    return HandleResponse<LoginAuthResponse>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, login as LoginAuthResponse)
}