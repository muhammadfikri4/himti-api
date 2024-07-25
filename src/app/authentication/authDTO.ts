import { Role } from "@prisma/client"

export interface RegisterAuthBodyDTO {
    email: string
    password: string
    name: string
    nim: string,
    role?: Role
    anggotaId?: string
}

export interface LoginAuthBodyDTO {
    email: string
    password: string
}

export interface LoginAuthResponse {
    access_token: string,
    user: {
        name: string,
        nim: string,
        role: Role
    }
}