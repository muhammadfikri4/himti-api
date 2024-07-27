import { prisma } from "../../config"
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO"

export const getProfile = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}

export const updateProfile = async (data: ProfileDTO) => {
    return await prisma.user.update({
        where: {
            id: data.id
        },
        data
    })
}

export const updatePassword = async ({ newPassword, id }: ChangePasswordDTO) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: newPassword
        }
    })
}