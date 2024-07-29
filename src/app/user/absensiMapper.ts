import { Absensi } from "@prisma/client";

export const absensiMapper = (data: Absensi[]) => {
    return data.map((item) => {
        const { userId, acaraId, ...rest } = item
        console.log(userId, acaraId)
        return rest

    })
}