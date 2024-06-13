import { AnggotaModel } from '../../config/model/anggota'
import { AngkatanModel } from '../../config/model/angkatan'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { AnggotaBodyDTO } from './anggotaDTO'

export const anggotaValidate = async ({ nim, name, email, angkatanId }: AnggotaBodyDTO) => {
    if (!nim) {
        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NIM)
    }
    if (!name) {

        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NAME)
    }
    if (!email) {

        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.EMAIL)
    }
    if (email && !REGEX.email.test(email as string)) {

        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIM = await AnggotaModel.findOne({ nim })
    if (matchNIM) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await AnggotaModel.findOne({ email })
    if (matchEmail) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!angkatanId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    const matchAngkatan = await AngkatanModel.findOne({ _id: angkatanId })

    if (!matchAngkatan) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }

}