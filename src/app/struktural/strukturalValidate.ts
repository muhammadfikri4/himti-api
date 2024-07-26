import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { getAnggotaById } from '../anggota/anggotaRepository'
import { StrukturalBodyDTO } from './strukturalDTO'

export const strukturalValidate = async ({ anggotaId, image, jabatan }: StrukturalBodyDTO) => {

    const jabatanIsValid = (jabatan !== 'KETUA_HIMPUNAN') && (jabatan !== 'WAKIL_KETUA_HIMPUNAN') && jabatan !== 'SEKRETARIS' && jabatan !== 'BENDAHARA' && jabatan !== 'KETUA_DEPARTMENT'
    console.log({ jabatan })
    if (!anggotaId) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ANGGOTA_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!jabatan) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.JABATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (jabatan && jabatanIsValid) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.JABATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAnggota = await getAnggotaById(anggotaId)

    if (!matchAnggota) {

        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (!image) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}