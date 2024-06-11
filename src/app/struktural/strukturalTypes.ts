import { ObjectId } from "mongoose"
import { MetaResponse } from "../../interface/ResponseInterface"

export interface StrukturalModelTypes {
    _id: ObjectId
    id?: string
    nim?: string
    name?: string,
    email?: string,
    // angkatan?: {
    //     _id: ObjectId,
    //     angkatan: number,
    //     isActive: boolean
    // },
    angkatanId?: ObjectId
    jabatan?: string,
    image?: string,
    imageUrl?: string,
    instagram?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    isActive?: boolean
    createdAt: Date,
    updatedAt: Date
}

export interface SearchStrukturalTypes {
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