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

export const getUserFCMByUserId = async (userId: string) => {
    return await prisma.userFCM.findFirst({
        where: {
            userId
        }
    })
}

export const getAllFCMUser = async () => {
    return await prisma.userFCM.findMany()
}