import { prisma } from "../../config"

export const addPoint = async (absensiId: number, userId: string, point: number) => {
    return await prisma.point.create({
        data: {
            absensiId, userId, point
        }
    })
}

export const getPointByAbsensi = async (absensiId: number, userId: string) => {
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