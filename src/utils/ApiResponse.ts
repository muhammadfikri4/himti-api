import { ResponseInterface } from "../interface/ResponseInterface";

export function ApiResponse<Res = unknown>({ data, status, message, code, meta }: ResponseInterface<Res>) {
    return {
        status,
        code,
        message,
        data,
        meta
    }
}