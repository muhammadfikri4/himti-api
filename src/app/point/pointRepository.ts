import { prisma } from "../../config"

export const addPoint = async (absensiId: number, userId: string, point: number) => {
    return await prisma.point.create({
        data: {
            absensiId, userId, point
        }
    })
}

export const getPointByAbsensiUserId = async (absensiId: number, userId: string) => {
    const point = await prisma.point.findFirst({
        where: {
            absensiId,
            userId
        },
        select: {
            point: true
        }
    })

    return point?.point
}

export const getPointByUserId = async (userId: string) => {
    const point = await prisma.point.aggregate({
        _sum: {
            point: true
        },
        where: {
            userId
        }
    })
    return point
}

export const getPointByAbsensi = async (absensiId: number) => {
    const point = await prisma.point.findFirst({
        where: {
            absensiId
        }
    })
    return point
}