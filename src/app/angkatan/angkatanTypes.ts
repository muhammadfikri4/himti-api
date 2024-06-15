import { ObjectId } from "mongoose"

export interface AngkatanModelTypes {
    _id?: ObjectId
    angkatan: number,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface SearchAngkatanTypes {
    search?: string,
    page?: number,
    perPage?: number
}

export interface IAngkatanResponse {
    id: AngkatanModelTypes['_id']
    angkatan: AngkatanModelTypes['angkatan']
    isActive: AngkatanModelTypes['isActive']
    createdAt?: AngkatanModelTypes['createdAt']
    updatedAt?: AngkatanModelTypes['updatedAt']
}