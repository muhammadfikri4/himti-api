import { ObjectId } from "mongoose"

export interface StrukturalBodyDTO {
    id?: string
    nim?: string
    name?: string,
    email?: string,
    angkatanId?: ObjectId,
    jabatan?: string,
    image?: string,
    imageUrl?: string,
    instagram?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    isActive?: boolean
}