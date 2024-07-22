import { decode } from "jsonwebtoken"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { AbsensiDTO, TokenTypes } from "./absensiDTO"
import { absensiMapper } from "./absensiMapper"
import { createAbsensi, getAbsensiByUserId } from "./absensiRepository"
import { createAbsensiValidate } from "./absensiValidate"

export const createAbsensiService = async ({ acaraId, image, coordinate }: AbsensiDTO, token: string) => {
    const decodeToken = decode(token)
    // if (!(decodeToken as TokenTypes)?.id) {
    //     return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER_ID, 404, MESSAGE_CODE.NOT_FOUND)
    // }
    const validate = await createAbsensiValidate({ acaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate })

    if (validate instanceof ErrorApp) {
        return validate
    }

    const absensi = await createAbsensi({ acaraId, image, userId: (decodeToken as TokenTypes)?.id as string, coordinate })
    return absensi
}

export const getAbsensiService = async (token: string) => {
    const decodeToken = decode(token)
    // if (!(decodeToken as TokenTypes)?.id) {
    //     return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER_ID, 404, MESSAGE_CODE.NOT_FOUND)
    // }
    const absensi = await getAbsensiByUserId((decodeToken as TokenTypes)?.id as string)
    if (!absensi.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const data = absensiMapper(absensi)
    return data
}