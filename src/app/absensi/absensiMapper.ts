import { Absensi, Point } from "@prisma/client";
import { ImagePath } from "../../utils/ImagePath";

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

export interface AbsensiAcara extends Absensi {
    acara: {
        id: string
        name: string
    },
    subAcara: {
        id: string
        name: string
    }
    Point: Point[]
}

export const absensiMapper = (data: Absensi[]) => {
    return data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, acaraId, ...rest } = item

        return rest

    })
}

export const historyAbsensiMapper = (absensi: AbsensiAcara[]): HistoryAbsensiResponse[] => {
    const data: AbsensiAcara[] = []
    absensi.map((item) => {
        if (data.find((i: AbsensiAcara) => i.acaraId === item.acaraId)) {
            return null
        }
        data.push(item as unknown as AbsensiAcara)
    })

    const absens = data.map(item => {
        const subacara = absensi.filter(i => i.acaraId === item.acaraId)
        return {
            acara: {
                id: item.acara.id,
                name: item.acara.name
            },
            absensi: subacara.map(subItem => {
                return {
                    id: subItem.id,
                    image: subItem.image.includes('https')? subItem.image : ImagePath(`absensi/${subItem.image}`),
                    absensiTime: subItem.absensiTime as string,
                    subAcara: {
                        id: subItem.subAcara.id,
                        name: subItem?.subAcara?.name as string
                    },
                    point: subItem.Point.reduce((a: number, b: Point) => a + b.point, 0)
                }
            })
        }
    })
    return absens
}