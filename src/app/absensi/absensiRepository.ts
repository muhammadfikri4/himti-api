import { prisma } from "../../config"
import { AbsensiDTO } from "./absensiDTO"

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