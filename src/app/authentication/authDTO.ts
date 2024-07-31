import { Role } from "@prisma/client"

export interface RegisterAuthBodyDTO {
    email: string
    password: string
    name: string
    nim: string,
    role?: Role
    code?: string
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

export interface RequestOtpDTO {
    name: string
    email: string
}

export interface ValidateOtpDTO {
    key: string,
    otp: number
}

export interface ForgotPasswordDTO {

    key: string
    password: string
}