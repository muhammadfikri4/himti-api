
export interface HttpError extends Error {
    statusCode: number;
    message: string,
    code: string
}

export const AppError = (message: string, statusCode: number, code: string) => {
    const error = new Error() as HttpError
    error.statusCode = statusCode;
    error.message = message
    error.code = code
    return error;
}


export class ErrorApp extends Error {
    message: string
    statusCode: number
    code: string
    constructor(message: string, statusCode: number, code: string) {
        super(message)
        this.statusCode = statusCode
        this.code = code
        this.message = message

    }
}