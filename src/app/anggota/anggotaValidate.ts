
import { getAngkatanById } from 'app/angkatan/angkatanRepository'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { AnggotaBodyDTO } from './anggotaDTO'
import { getAnggotaByEmail, getAnggotaByNIM } from './anggotaRepository'

export const anggotaValidate = async ({ nim, name, email, angkatanId }: AnggotaBodyDTO) => {

    if (typeof nim !== 'number') {
        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.INVALID.NIM)
    }
    if (!nim) {
        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NIM)
    }
    if (!name) {

        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NAME)
    }
    if (email && !REGEX.email.test(email as string)) {

        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIM = await getAnggotaByNIM(String(nim))
    if (matchNIM) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.NIM, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await getAnggotaByEmail(email as string)
    if (matchEmail) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!angkatanId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    const matchAngkatan = await getAngkatanById(angkatanId)

    if (!matchAngkatan) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }

}