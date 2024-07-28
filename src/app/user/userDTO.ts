import { Role } from "@prisma/client"

export interface AbsensiDTO {
    userId?: string
    acaraId: string
    image: string,
    coordinate: string
}

export interface TokenTypes {
    id: string
}

export interface IFilterUser {
    search?: string
    role?: Role
    page?: number
    perPage?: number
}