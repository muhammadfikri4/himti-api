import { decode } from "jsonwebtoken"
import { TokenDecodeInterface } from "../../interface"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getSubAcaraById } from "../acara/acaraRepository"
import { AbsensiDTO, IFilterAbsensi, TokenTypes } from "./absensiDTO"
import { createAbsensi, getAbsensiBySubAcaraId, getAbsensiByUserId, getHistoryAbsensiByUserId } from "./absensiRepository"
import { createAbsensiAcaraValidate, createAbsensiSubAcaraValidate } from "./absensiValidate"

export const createAbsensiAcaraService = async ({ acaraId, image, address, coordinate }: AbsensiDTO, token: string) => {
    const decodeToken = decode(token)

    const validate = await createAbsensiAcaraValidate({ acaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate })

    if (validate instanceof ErrorApp) {
        return validate
    }

    const absensi = await createAbsensi({ acaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate, address })
    return absensi
}
export const createAbsensiSubAcaraService = async ({ subAcaraId, image, coordinate, address, absensiTime }: AbsensiDTO, token: string) => {
    const decodeToken = decode(token)

    const validate = await createAbsensiSubAcaraValidate({ subAcaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate })

    if (validate instanceof ErrorApp) {
        return validate
    }

    const userId = (decodeToken as TokenDecodeInterface)?.id

    const getAbsensi = await getAbsensiBySubAcaraId(subAcaraId as string, userId as string)

    if (getAbsensi) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI_ONCE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const getSubAcara = await getSubAcaraById(subAcaraId as string)

    if (!getSubAcara?.isOpenAbsen) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const absensi = await createAbsensi({ acaraId: getSubAcara?.acaraId, subAcaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate, address, absensiTime })
    return absensi
}

export const getAbsensiService = async ({ acaraId, page = 1, perPage = 10, subAcaraId }: IFilterAbsensi, token: string) => {
    const decodeToken = decode(token) as TokenDecodeInterface
    const acara = await getAbsensiByUserId(decodeToken.id)
    const splitAcara = await Promise.all(acara.map(async (item) => {
        const { acara, subAcara, acaraId, subAcaraId, user, createdAt, ...rest } = item
        return {
            ...rest,
            name: acara.name,
            subAcara: subAcara ? subAcara : null,
            user
            // subItem: await getAllSubAcaraById(item.subAcaraId as string)
        }
    }))
    const groupedData = splitAcara.reduce((acc: any, current: any) => {
        const { acaraId, name } = current;

        if (!acc[acaraId]) {
            acc[acaraId] = {
                acaraId: acaraId,
                name,
                items: []
            };
        }

        acc[acaraId].items.push(current);
        return acc;
    }, {});

    // Mengubah objek menjadi array
    const mergedData = Object.values(groupedData);

    const absensi = await getHistoryAbsensiByUserId((decodeToken as TokenTypes)?.id as string, acaraId, subAcaraId, page, perPage)
    if (!absensi.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }
    // const data = absensiMapper(absensi)
    return mergedData
}