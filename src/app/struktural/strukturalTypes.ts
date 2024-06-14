import { ObjectId } from "mongoose"

export interface StrukturalModelTypes {
    _id?: ObjectId
    id?: ObjectId
    nim?: number
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

