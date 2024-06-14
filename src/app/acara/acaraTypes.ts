import { ObjectId } from "mongoose"

export interface AcaraModelTypes {
    _id?: ObjectId
    id?: ObjectId
    name?: string
    description?: string,
    image?: string,
    imageUrl?: string,
    isOpen?: boolean,
    startDate?: Date,
    endDate?: Date
    createdAt: Date,
    updatedAt: Date
}

export interface SearchAcaraTypes {
    name?: string,
    email?: string,
    nidn?: number,
    page?: number,
    perPage?: number
    totalData?: number,
    totalPage?: number
}
