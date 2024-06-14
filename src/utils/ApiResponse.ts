import { MetaResponse, ResponseInterface } from "../interface/ResponseInterface";


export interface Result<Res = unknown> {
    data: Res,
    meta: MetaResponse
}

export function ApiResponse<Res = unknown>({ data, status, message, code, meta }: ResponseInterface<Res>) {
    return {
        status,
        code,
        message,
        data,
        meta
    }
}