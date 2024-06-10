export type CODE = "UNAUTHORIZED" | "NOT FOUND" | "BAD REQUEST" | "INTERNAL SERVER ERROR" | "SUCCESS" | "CREATED"

export interface ResponseInterface<Res = unknown> {
    code: string,
    status: number,
    data?: Res,
    message: string,
    meta?: {
        page: number,
        perPage: number,
        total: number,
        totalPages: number
    }
}