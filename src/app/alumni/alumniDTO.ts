import { ObjectId } from "mongoose"

export interface AlumniBodyDTO {
    id?: string,
    anggotaId?: ObjectId,
    imageUrl?: string,
    image?: string,
    company?: string,
    isActive?: boolean
}