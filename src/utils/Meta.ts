import { MetaResponse } from "../interface/ResponseInterface"

export const Meta = (page: number, perPage: number, totalData: number): MetaResponse => {
    return {
        page,
        perPage,
        totalData,
        totalPages: Math.ceil(totalData / perPage)
    }
}