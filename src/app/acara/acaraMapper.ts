import { SubAcara } from "@prisma/client";
import { getSingleAbsensiByUserId } from "../absensi/absensiRepository";
import { SubAcaraDTO } from "./acaraDTO";
import { AcaraModelTypes } from "./acaraTypes";

export const acaraMapper = (acaras: AcaraModelTypes[]) => {
    const mapper = acaras.map((acara) => {
        const { isOpen, isOpenAbsen, createdAt, updatedAt, ...rest } = acara
        return {
            ...rest,
            isOpenRegister: acara.isOpen,
            isOpenAbsen,
            createdAt,
            updatedAt

        }
    })
    return mapper
}

export const subAcaraMapper = async (subAcaras: SubAcara[], userId: string): Promise<SubAcaraDTO[]> => {
    return await Promise.all(subAcaras.map(async (item: SubAcara) => {
        // const { createdAt, updatedAt, ...rest } = item
        let isAlreadyAbsen = false
        const absensi = await getSingleAbsensiByUserId(userId, item.id as string)
        if (absensi) {
            isAlreadyAbsen = true
        }
        const isExpired = new Date(item.endTime as Date) < new Date(Date.now())

        return {
            ...item,
            isOpenAbsen: !isExpired,
            isAlreadyAbsen,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
    }))
}