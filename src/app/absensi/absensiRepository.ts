import { prisma } from "../../config"

export const createAbsensi = async ({ acaraId, image, userId }: AbsensiDTO) => {
    return await prisma.absensi.create({
        data: {
            image, acaraId, userId
        }
    })
}