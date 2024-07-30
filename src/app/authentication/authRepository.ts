import { prisma } from "../../config"
import { RegisterAuthBodyDTO } from "./authDTO"

export const createUser = async ({ email, name, password, nim, role, anggotaId }: RegisterAuthBodyDTO) => {
    return await prisma.user.create({
        data: {
            email,
            name,
            password,
            nim,
            role,
            anggotaId
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

export const getUserByNIM = async (nim: string) => {
    return await prisma.user.findFirst({
        where: {
            nim
        }
    })
}

export const createOtp = async (otp: number, expired: Date) => {
    return await prisma.oTP.create({
        data: {
            otp,
            isVerified: false,
            expired
        }
    })
}

export const getOtp = async (id: string) => {
    return await prisma.oTP.findUnique({
        where: {
            id
        }
    })
}

export const verifiedOtp = async (id: string) => {
    return await prisma.oTP.update({
        where: {
            id
        },
        data: {
            isVerified: true
        }
    })
}

export const deleteOtp = async (id: string) => {
    return await prisma.oTP.delete({
        where: {
            id
        }
    })
}