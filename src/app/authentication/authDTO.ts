import { Role } from "@prisma/client"

export interface RegisterAuthBodyDTO {
    email: string
    password: string
    name: string
    nim: string,
    role?: Role
}

export interface LoginAuthBodyDTO {
    email: string
    password: string
}

export interface LoginAuthResponse {
    access_token: string
}