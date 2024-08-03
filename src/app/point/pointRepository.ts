import { prisma } from "../../config"

export const addPoint = async (absensiId: number, userId: string, point: number) => {
    return await prisma.point.create({
        data: {
            absensiId, userId, point
        }
    })
}

export const getPointByAbsensi = async (absensiId: number, userId: string) => {
    return await prisma.point.findFirst({
        where: {
            absensiId,
            userId
        }
    })
}