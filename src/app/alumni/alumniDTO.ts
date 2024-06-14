import mongoose, { ObjectId } from "mongoose"

export interface AlumniBodyDTO {
    id?: string
    angkatanId?: mongoose.mongo.ObjectId,
    anggotaId?: ObjectId,
    imageUrl?: string,
    image?: string,
    company?: string,
    isActive?: boolean
}