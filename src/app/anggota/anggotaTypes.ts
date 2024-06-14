import { ObjectId } from "mongoose"

export interface AnggotaModelTypes {
    _id: ObjectId
    nim?: number
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

