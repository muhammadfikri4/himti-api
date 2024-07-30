import { Absensi } from "@prisma/client";

export const absensiMapper = (data: Absensi[]) => {
    return data.map((item) => {
        const { userId, acaraId, ...rest } = item

        return rest

    })
}