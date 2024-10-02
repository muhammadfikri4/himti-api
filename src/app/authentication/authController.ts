import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { LoginAuthResponse } from "./authDTO";
import {
  forgotPasswordService,
  loginAdminService,
  loginService,
  logoutService,
  registerService,
  requestOtpService,
  validateOtpService,
} from "./authService";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, nim, code } = req.body;

  const register = await registerService({ name, email, password, nim, code });

  if (register instanceof ErrorApp) {
    next(register);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.USER.ACCOUNT);
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { email, password } = req.body
  const { body } = req;

  const login = await loginService(body);
  if (login instanceof ErrorApp) {
    next(login);
    return;
  }
  res.cookie("access_token", login, { httpOnly: true });
  HandleResponse<LoginAuthResponse>(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER,
    login as LoginAuthResponse
  );
};

export const loginAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const login = await loginAdminService({ email, password });
  if (login instanceof ErrorApp) {
    next(login);
    return;
  }
  res.cookie("access_token", login, { httpOnly: true });
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.USER, login);
};

export const requestOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const otp = await requestOtpService(email as string);

  if (otp instanceof ErrorApp) {
    next(otp);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.OTP.SEND,
    otp
  );
};

export const validateOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { key, otp } = req.body;

  const otps = await validateOtpService({ key, otp });

  if (otps instanceof ErrorApp) {
    next(otps);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.OTP.VERIFY,
    otps
  );
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { key, password } = req.body;
  const forgot = await forgotPasswordService({ key, password });

  if (forgot instanceof ErrorApp) {
    next(forgot);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PASSWORD.CHANGE
  );
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const logout = await logoutService(token as string);

  if (logout instanceof ErrorApp) {
    next(logout);
    return;
  }

  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.LOGOUT);
};

export const checkToken = async (req: Request, res: Response) => {
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TOKEN);
};
