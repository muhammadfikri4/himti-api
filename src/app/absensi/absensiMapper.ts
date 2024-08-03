import { Absensi } from "@prisma/client";
import { getAllAbsensiByAcaraId } from "./absensiRepository";

interface HistoryAbsensiResponse {
    acara: {
        id: string,
        name: string
    },
    absensi: {
        id: number
        image: string
        absensiTime: string
        subAcara: {
            id: string
            name: string
        }
    }[]
}

interface AbsensiAcara extends Absensi {
    acara: {
        id: string
        name: string
    }
}

export const absensiMapper = (data: Absensi[]) => {
    return data.map((item) => {
        const { userId, acaraId, ...rest } = item

        return rest

    })
}

export const historyAbsensiMapper = (absensi: Absensi[], userId: string) => {
    const data: AbsensiAcara[] = []
    absensi.map(async (item) => {
        if (data.find((i: any) => i.acaraId === item.acaraId)) {
            return null
        }
        data.push(item as unknown as AbsensiAcara)
    })
    const newData: HistoryAbsensiResponse[] = []
    data.map(async (item: AbsensiAcara) => {
        const subAcara = await getAllAbsensiByAcaraId(item.acaraId, userId)
        newData.push({
            acara: {
                id: item.acara.id,
                name: item.acara.name
            },
            absensi: subAcara.map((subItem) => ({
                id: subItem.id as number,
                image: subItem.image,
                absensiTime: subItem.absensiTime as string,
                subAcara: {
                    id: subItem?.subAcara?.id as string,
                    name: subItem?.subAcara?.name as string
                }
            }))
        })
    })

    return newData
}