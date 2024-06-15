import { ObjectId } from "mongoose"

export interface StrukturalBodyDTO {
    id?: string,
    anggotaId?: ObjectId,
    jabatan?: string,
    image?: string,
    instagram?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    isActive?: boolean
}