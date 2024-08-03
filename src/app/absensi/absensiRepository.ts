import { Prisma } from "@prisma/client"
import { prisma } from "../../config"
import { AbsensiDTO } from "./absensiDTO"

export const createAbsensi = async ({ acaraId, image, userId, coordinate, subAcaraId, address, absensiTime }: AbsensiDTO) => {
    return await prisma.absensi.create({
        data: {
            image,
            acaraId: acaraId as string,
            subAcaraId: subAcaraId ? subAcaraId : null,
            userId: userId as string,
            coordinate,
            address,
            absensiTime
        }
    })
}

export const getHistoryAbsensiByUserId = async (userId: string, acaraId?: string, subAcaraId?: string, page?: number, perPage?: number) => {

    const filter = {
        OR: [
            { userId }
        ]
    } as { OR: Prisma.AbsensiWhereInput[] }

    if (acaraId) {
        filter.OR = [...filter.OR, { acaraId }]
    }

    if (subAcaraId) {
        filter.OR = [...filter.OR, { subAcaraId }]
    }

    return await prisma.absensi.findMany({
        where: filter,
        include: {
            acara: {
                select: {
                    id: true,
                    name: true
                },
            },
            subAcara: {
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
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getSingleAbsensiByUserId = async (userId: string, subAcaraId: string) => {
    return await prisma.absensi.findFirst({
        where: {
            userId,
            AND: {
                subAcaraId
            }
        }
    })
}

export const getAbsensiBySubAcaraId = async (subAcaraId: string, userId: string) => {
    return await prisma.absensi.findFirst({
        where: {
            subAcaraId,
            userId
        }
    })
}

export const getAbsensiByUserId = (userId: string) => {
    return prisma.absensi.findMany({
        where: {
            userId
        },
        include: {
            acara: true,
            subAcara: true
        }
    })
}