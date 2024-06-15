import { AngkatanModel } from '../../config/model/angkatan'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { StrukturalBodyDTO } from './strukturalDTO'

export const strukturalValidate = async ({ anggotaId, image, jabatan }: StrukturalBodyDTO) => {



    if (!anggotaId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!jabatan) {

        return AppError(MESSAGES.ERROR.REQUIRED.JABATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAnggota = await AngkatanModel.findOne({ _id: anggotaId })

    if (!matchAnggota) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (!image) {
        return AppError(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}