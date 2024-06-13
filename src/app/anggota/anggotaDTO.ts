import { ObjectId } from "mongoose"

export interface AnggotaBodyDTO {
    id?: string
    nim?: string
    name?: string,
    email?: string,
    angkatanId?: ObjectId,
    isActive?: boolean
}