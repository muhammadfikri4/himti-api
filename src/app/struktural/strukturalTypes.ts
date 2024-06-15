import { ObjectId } from "mongoose"

export interface StrukturalModelTypes {
    _id: ObjectId,
    anggotaId: ObjectId
    jabatan: string,
    image: string,
    instagram: string,
    facebook: string,
    twitter: string,
    linkedin: string,
    isActive: boolean
    createdAt: Date,
    updatedAt: Date
}

export interface SearchStrukturalTypes {
    name?: string,
    page?: number,
    perPage?: number
}

export interface IStrukturalResponse {
    id: ObjectId,
    anggota?: {
        id: ObjectId,
        name: string,
        nim: number,
        isActive: boolean,
        angkatan: {
            id: ObjectId,
            angkatan: number,

        },
    },
    jabatan: string,
    image: string,
    instagram?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}