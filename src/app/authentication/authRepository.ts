import { prisma } from "../../config"
import { RegisterAuthBodyDTO } from "./authDTO"

export const createUser = async ({ email, name, password, nim, role, memberId }: RegisterAuthBodyDTO) => {
    return await prisma.user.create({
        data: {
            email,
            name,
            password,
            nim,
            role,
            memberId
        },
        select: {
            id: true
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        include: {
            UserFCM: {
                select: {
                    id: true,
                    userId: true,
                    fcmToken: true
                }
            }
        },

    })
}

export const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            UserFCM: {
                select: {
                    id: true,
                    userId: true,
                    fcmToken: true
                }
            }
        },
    })
}

export const getUserByNIM = async (nim: string) => {
    return await prisma.user.findFirst({
        where: {
            nim
        },
        select: {
            id: true,
            email: true,
            name: true,
            nim: true,
            role: true
        }

    })
}

export const createOtp = async (otp: string, email: string, expired: Date) => {
    return await prisma.oTP.create({
        data: {
            otp,
            isVerified: false,
            expired,
            email
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

export const changePassword = (id: string, password: string) => {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            password
        }
    })
}

export const userLogin = async (id: string, isLogin: boolean) => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            isLogin
        },
        select: {
            id: true
        }
    })
}