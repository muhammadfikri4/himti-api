
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { getAngkatanById } from '../angkatan/angkatanRepository'
import { AnggotaBodyDTO } from './anggotaDTO'
import { getAnggotaByEmail, getAnggotaByNIM } from './anggotaRepository'

export const anggotaValidate = async ({ nim, email, angkatanId }: AnggotaBodyDTO) => {

    if (typeof nim !== 'number') {
        return new ErrorApp(MESSAGES.ERROR.INVALID.NIM.FORMAT, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIM = await getAnggotaByNIM(String(nim))
    if (matchNIM) {

        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.NIM, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await getAnggotaByEmail(email as string)
    if (matchEmail) {

        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!angkatanId) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    const matchAngkatan = await getAngkatanById(angkatanId)

    if (!matchAngkatan) {

        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }

}