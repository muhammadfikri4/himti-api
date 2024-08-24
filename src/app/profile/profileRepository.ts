import { prisma } from "../../config"
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO"

export const getProfile = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            Anggota: {
                select: {
                    id: true,
                    facebook: true,
                    instagram: true,
                    linkedin: true,
                    twitter: true
                }
            },
            Point: {
                select: {
                    point: true
                }
            }
        }
    })
}

export const updateProfile = async (data: ProfileDTO) => {
    return await prisma.user.update({
        where: {
            id: data.id
        },
        data,
        select: {
            id: true,
            email: true,
            name: true,
            nim: true,
            role: true
        }
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