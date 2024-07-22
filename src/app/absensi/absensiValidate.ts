import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getAcaraById } from "../acara/acaraRepository"
import { getAnggotaByNIM } from "../anggota/anggotaRepository"
import { getUserById } from "../authentication/authRepository"
import { AbsensiDTO } from "./absensiDTO"

export const createAbsensiValidate = async ({ acaraId, image, userId, coordinate }: AbsensiDTO) => {
    if (!acaraId) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ACARA, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const getAcara = await getAcaraById(acaraId as string)
    if (!getAcara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (!image) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const getUser = await getUserById(userId as string)
    if (!getUser) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const getAnggota = await getAnggotaByNIM(getUser.nim)
    if (getUser && !getAnggota) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST);

    }
    if (!coordinate) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.COORDINATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}