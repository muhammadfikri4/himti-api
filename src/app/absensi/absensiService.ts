import { decode } from "jsonwebtoken"
import { TokenDecodeInterface } from "../../interface"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getSubAcaraById } from "../acara/acaraRepository"
import { addPoint, getPointByAbsensi } from "../point/pointRepository"
import { AbsensiDTO, IFilterAbsensi, TokenTypes } from "./absensiDTO"
import { historyAbsensiMapper } from "./absensiMapper"
import { createAbsensi, getAbsensiById, getAbsensiBySubAcaraId, getAbsensiByUserId } from "./absensiRepository"
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
    await addPoint(absensi.id, userId, 20)
    return absensi
}

export const getAbsensiService = async ({ acaraId }: IFilterAbsensi, token: string) => {
    const decodeToken = decode(token) as TokenDecodeInterface
    const acara = await getAbsensiByUserId(decodeToken.id, acaraId)

    const data = await historyAbsensiMapper(acara, decodeToken.id)
    // const absensi = await getHistoryAbsensiByUserId((decodeToken as TokenTypes)?.id as string, acaraId, subAcaraId, page, perPage)
    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return data
}

export const getAbsensiByIdService = async (id: number) => {
    const absensi = await getAbsensiById(id)
    const { userId, acaraId, subAcaraId, acara, user, subAcara, createdAt, updatedAt, ...rest } = absensi ?? {}

    const points = await getPointByAbsensi(absensi?.id as number)
    const response = {
        ...rest,
        acara: acara?.name,
        subAcara: subAcara?.name,
        user: user?.name,
        points: points?.point || 0
    }

    if (!response) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return response
}