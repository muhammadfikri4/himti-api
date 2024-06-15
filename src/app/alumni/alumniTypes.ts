import { ObjectId } from "mongoose"

export interface AlumniModelTypes {
    _id?: ObjectId,
    anggotaId?: ObjectId,
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

export interface IAlumniResponse {
    id?: AlumniModelTypes['_id']
    anggotaId?: AlumniModelTypes['anggotaId'],
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
    image?: AlumniModelTypes['image'],
    company?: AlumniModelTypes['company'],
    isActive?: AlumniModelTypes['isActive']
    createdAt: AlumniModelTypes['createdAt'],
    updatedAt: AlumniModelTypes['updatedAt']
}