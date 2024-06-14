import { ObjectId } from "mongoose"

export interface AcaraModelTypes {
    _id?: ObjectId
    id?: ObjectId
    name?: string
    description?: string,
    image?: string,
    imageUrl?: string,
    isOpen?: boolean,
    startTime?: Date,
    endTime?: Date
    createdAt: Date,
    updatedAt: Date
}

export interface SearchAcaraTypes {
    name?: string,
    page?: number,
    perPage?: number
}
