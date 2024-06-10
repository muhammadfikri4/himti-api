import { type Response } from 'express'
import { ResponseInterface } from 'interface/ResponseInterface'
import { ApiResponse } from './ApiResponse'

export function HandleResponse<Res = unknown>(
    res: Response,
    status: number,
    code: string,
    message: string,
    data?: Res,
    meta?: ResponseInterface['meta']
) {
    return res.status(status).json(ApiResponse<Res>({ status, message, data, code, meta }))
}