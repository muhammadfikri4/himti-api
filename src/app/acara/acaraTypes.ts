import { ObjectId } from "mongoose"

export interface AcaraModelTypes {
    _id?: ObjectId
    name?: string
    description?: string,
    image?: string,
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

export interface IAcaraResponse {
    id?: AcaraModelTypes['_id']
    name?: AcaraModelTypes['name']
    description?: AcaraModelTypes['description'],
    image?: AcaraModelTypes['image'],
    isOpen?: AcaraModelTypes['isOpen'],
    startTime?: AcaraModelTypes['startTime'],
    endTime?: AcaraModelTypes['endTime'],
    createdAt: AcaraModelTypes['createdAt'],
    updatedAt: AcaraModelTypes['updatedAt']
}
