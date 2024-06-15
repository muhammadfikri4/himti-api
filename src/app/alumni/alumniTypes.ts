import { ObjectId } from "mongoose"

export interface AlumniModelTypes {
    _id?: ObjectId
    id?: ObjectId
    anggotaId?: ObjectId,
    anggota?: {
        id: ObjectId,
        name: string,
        nim: number,
        isActive: boolean,
        angkatan: {
            id: ObjectId,
            angkatan: number,
            isActive: boolean

        },
    },
    imageUrl?: string,
    image?: string,
    company?: string,
    isActive?: boolean
    createdAt: Date,
    updatedAt: Date
}

export interface SearchAlumniTypes {
    name?: string,
    page?: number,
    perPage?: number
    totalData?: number,
    totalPage?: number
}
