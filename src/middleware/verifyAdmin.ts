import { NextFunction, type Request, type Response } from "express";
import { TokenDecodeInterface } from "interface";
import { TokenExpiredError, decode, verify } from 'jsonwebtoken';
import { getUserById } from "../app/authentication/authRepository";
import { environment } from "../libs";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { HandleResponse } from "../utils/HandleResponse";
import { MESSAGES } from "../utils/Messages";

export const VerifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN)
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    verify(token, environment.JWT_SECRET as string, async (err) => {
        if (err) {
            if (err instanceof TokenExpiredError) {

                return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.EXPIRED)
            }
            const decodeToken = decode(token)
            if (!(decodeToken as TokenDecodeInterface)?.id) {
                return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED)
            }
            if ((decodeToken as TokenDecodeInterface)?.id) {
                const { id } = decodeToken as TokenDecodeInterface
                const getUser = await getUserById(id)

                if (!getUser) {
                    return HandleResponse(res, 401, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT)
                }

                if (getUser.role !== "ADMIN") {
                    return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.ROLE_ADMIN)
                }

            }
            return HandleResponse(res, 401, MESSAGE_CODE.UNAUTHORIZED, MESSAGES.ERROR.INVALID.AUTH)
        }
        next()
    })


}