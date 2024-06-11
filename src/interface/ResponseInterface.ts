export type CODE = "UNAUTHORIZED" | "NOT FOUND" | "BAD REQUEST" | "INTERNAL SERVER ERROR" | "SUCCESS" | "CREATED"

export interface MetaResponse {
    page: number,
    perPage: number,
    totalData: number,
    totalPages: number
}

export interface ResponseInterface<Res = unknown> {
    code: string,
    status: number,
    data?: Res,
    message: string,
    meta?: MetaResponse
}