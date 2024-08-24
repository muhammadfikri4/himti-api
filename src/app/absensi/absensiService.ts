import { decode } from "jsonwebtoken"
import { TokenDecodeInterface } from "../../interface"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { FormatIDTime } from "../../utils/FormatIDTime"
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

    const absensiDate = new Date(FormatIDTime(new Date()))

    const getSubAcara = await getSubAcaraById(subAcaraId as string)
    const timeDifference = ((absensiDate?.getTime()) - new Date(FormatIDTime(getSubAcara?.startTime as Date))?.getTime()) / (1000 * 60 * 60)

    if (timeDifference <= 0) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI_NOT_OPEN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    // if (!getSubAcara?.isOpenAbsen) {
    //     return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI, 400, MESSAGE_CODE.BAD_REQUEST)
    // }


    const absensi = await createAbsensi({ acaraId: getSubAcara?.acaraId, subAcaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate, address, absensiTime })
    // const targetTime = new Date(getSubAcara?.startTime as Date) // Asumsikan startTime adalah waktu target

    // Periksa jika absensi dilakukan 3 jam lebih awal
    // Selisih dalam jam
    let points = 20 // Poin default
    console.log({ timeDifference, targetTime: new Date(FormatIDTime(getSubAcara?.startTime as Date)), absensiDate })
    // console.log({ absensi, timeDifference, targetTime, createdAt: absensi.createdAt, absensiDate })
    if (timeDifference >= 0 && timeDifference <= 1) {
        points = 100 // Poin untuk absen 3 jam lebih awal
    }
    console.log({ points })
    await addPoint(absensi.id, userId, points)
    return
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