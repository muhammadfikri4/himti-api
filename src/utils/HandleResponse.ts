import { type Response } from 'express'
import { CODE, MetaResponse } from '../interface/ResponseInterface'
import { ApiResponse } from './ApiResponse'

export function HandleResponse<Res = unknown>(
    res: Response,
    status: number,
    code: CODE,
    message: string,
    data?: Res,
    meta?: MetaResponse
) {
    return res.status(status).jsonp(ApiResponse<Res>({ status, message, data, code, meta }))
}