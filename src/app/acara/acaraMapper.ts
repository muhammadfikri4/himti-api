import { SubAcara } from "@prisma/client";
import { getSingleAbsensiByUserId } from "app/absensi/absensiRepository";
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

export const subAcaraMapper = async (subAcaras: SubAcara[], userId: string) => {
    return await Promise.all(subAcaras.map(async (item) => {
        const { createdAt, updatedAt, ...rest } = item
        let isAlreadyAbsen = false
        const absensi = await getSingleAbsensiByUserId(userId, item.id as string)
        if (absensi) {
            isAlreadyAbsen = true
        }
        return {
            ...rest,
            isAlreadyAbsen,
            createdAt,
            updatedAt
        }
    }))
}