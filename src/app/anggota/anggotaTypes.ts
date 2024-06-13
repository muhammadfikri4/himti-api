import { ObjectId } from "mongoose"
import { MetaResponse } from "../../interface/ResponseInterface"

export interface AnggotaModelTypes {
    _id: ObjectId
    nim?: string
    name?: string,
    email?: string,
    angkatanId?: ObjectId,
    isActive?: boolean,
    createdAt: Date
    updatedAt: Date
}

export interface SearchAnggotaTypes {
    name?: string,
    email?: string,
    nidn?: number,
    page?: number,
    perPage?: number
    totalData?: number,
    totalPage?: number
}


export interface Result<Res = unknown> {
    result: Res,
    meta: MetaResponse
}