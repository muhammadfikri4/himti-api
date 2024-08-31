import { Absensi, Acara, SubAcara } from "@prisma/client";
import { ImagePath } from "utils/ImagePath";
import { AcaraDTO, SubAcaraDTO } from "./acaraDTO";

export interface SubAcaraData extends SubAcara {
    absensi: Absensi[]
}

export const acarasDTOMapper = (acaras: Acara[]): AcaraDTO[] => {
    return acaras.map((acara) => {
        return {
            id: acara.id,
            description: acara.description,
            endTime: acara.endTime as Date,
            image: acara.image.includes('https') ? acara.image : ImagePath(`acara/${acara.image}`),
            name: acara.name,
            startTime: acara.startTime as Date,
            isOpen: acara.isOpen,
        }
    })
}
export const acaraDTOMapper = (acara: Acara): AcaraDTO => {
    return {
        id: acara.id,
        name: acara.name,
        description: acara.description,
        image: acara.image.includes('https') ? acara.image : ImagePath(`acara/${acara.image}`),
        startTime: acara.startTime as Date,
        endTime: acara.endTime as Date,
        isOpen: acara.isOpen,
    }
}

export const subAcaraMapper = (subAcaras: SubAcaraData[], userId: string): SubAcaraDTO[] => {
    return subAcaras.map((item) => {
        // const { createdAt, updatedAt, ...rest } = item
        let isAlreadyAbsen = false
        const absensi = item.absensi.filter((absen) => absen.userId === userId && absen.subAcaraId === item.id)
        if (absensi.length) {
            isAlreadyAbsen = true
        }
        const isExpired = new Date(item.endTime as Date) < new Date(Date.now())

        return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item?.image?.includes('https') ? item?.image : ImagePath(`acara/${item?.image}`),
            endTime: item.endTime as Date,
            startTime: item.startTime as Date,
            isOpenAbsen: !isExpired,
            isAlreadyAbsen
        }
    })
}