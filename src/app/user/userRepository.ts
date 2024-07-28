import { Prisma } from "@prisma/client"
import { prisma } from "../../config"
import { AbsensiDTO, IFilterUser } from "./userDTO"

export const createAbsensi = async ({ acaraId, image, userId, coordinate }: AbsensiDTO) => {
    return await prisma.absensi.create({
        data: {
            image,
            acaraId,
            userId: userId as string,
            coordinate
        }
    })
}

export const getAbsensiByUserId = async (userId: string) => {
    return await prisma.absensi.findMany({
        where: {
            userId
        },
        include: {
            acara: {
                select: {
                    id: true,
                    name: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    nim: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getUsers = async ({ page, perPage, search, role }: IFilterUser) => {
    const filter = {} as { OR: Prisma.UserWhereInput[] }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                role
            }


        ]
    }

    return await prisma.user.findMany({
        where: filter,
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}
export const getUsersCount = async ({ search }: IFilterUser) => {
    const filter = {} as { OR: Prisma.UserWhereInput[] }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },



        ]
    }

    return await prisma.user.count({
        where: filter,


    })
}