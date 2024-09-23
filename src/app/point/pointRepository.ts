import { prisma } from "../../config"

export const addPoint = async (attendanceId: number, userId: string, point: number) => {
    return await prisma.point.create({
        data: {
            attendanceId, 
            userId, 
            point
        }
    })
}

export const getPointByAbsensiUserId = async (attendanceId: number, userId: string) => {
    const point = await prisma.point.findFirst({
        where: {
            attendanceId,
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

export const getPointByAbsensi = async (attendanceId: number) => {
    const point = await prisma.point.findFirst({
        where: {
            attendanceId
        }
    })
    return point
}