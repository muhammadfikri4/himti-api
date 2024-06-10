import { ObjectId } from "mongoose"

export interface AngkatanModelTypes {
    _id: ObjectId
    angkatan: number,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface SearchAngkatanTypes {
    search?: string
}