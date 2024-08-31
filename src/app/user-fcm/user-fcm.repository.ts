import { prisma } from "../../config"

export const createUserFCM = async (userId: string, fcmToken: string) => {
    return await prisma.userFCM.create({
        data: {
            userId,
            fcmToken
        }
    })
}

export const deleteUserFCM = async (id: string) => {
    return await prisma.userFCM.delete({
        where: {
            id
        }
    })
}

export const getFCMUserById = async (fcmId: string) => {
    return await prisma.userFCM.findUnique({
        where: {
            id: fcmId
        }
    })
}

export const getUserFCMByUserId = async (userId: string) => {
    return await prisma.userFCM.findFirst({
        where: {
            userId
        }
    })
}

export const getAllFCMUser = async (page?: number, perPage?: number) => {
    return await prisma.userFCM.findMany({
        include: {
            User: true
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}
export const getAllFCMUserCount = async () => {
    return await prisma.userFCM.count()
}