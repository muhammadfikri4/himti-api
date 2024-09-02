import { NextFunction, type Request, type Response } from "express";
import { TokenDecodeInterface } from "../interface";
import { decode, verify } from 'jsonwebtoken';
import { RequestWithAccessToken } from "../interface/Request";
import { environment } from "../libs";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { HandleResponse } from "../utils/HandleResponse";
import { MESSAGES } from "../utils/Messages";

export const VerifyTokenWithoutExp = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
  }
  const token = req.headers.authorization.replace("Bearer ", "")
  verify(token, environment.JWT_SECRET as string, (err: unknown) => {
    if (err) {
      const decodeToken = decode(token)
      if (!(decodeToken as TokenDecodeInterface)?.id) {
        return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
      }    }
    (req as RequestWithAccessToken).userId = (decode(token) as TokenDecodeInterface)?.id
    next()
  })


}