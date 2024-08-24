import { Role } from "@prisma/client"

export interface ProfileDTO {
    id?: string
    email: string
    name: string
    nim: string
    role: Role
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string,
    point: number
}

export interface ChangePasswordDTO {
    id?: string
    oldPassword?: string
    newPassword: string
}