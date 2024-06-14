import { ObjectId } from "mongoose"

export interface AngkatanModelTypes {
    _id?: ObjectId
    id?: ObjectId
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