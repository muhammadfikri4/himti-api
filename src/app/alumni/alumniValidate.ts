import { AnggotaModel } from 'config/model/anggota'
import mongoose from 'mongoose'
import { AlumniModel } from '../../config/model/alumni'
import { AngkatanModel } from '../../config/model/angkatan'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { AlumniBodyDTO } from './alumniDTO'

export const alumniValidate = async ({ angkatanId, image, anggotaId, company }: AlumniBodyDTO) => {


    if (!anggotaId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGGOTA_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (anggotaId && !mongoose.Types.ObjectId.isValid(String(anggotaId))) {
        return AppError(`Anggota ${MESSAGES.ERROR.INVALID.ID}`, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    const matchAnggota = await AnggotaModel.findOne({ _id: anggotaId })

    if (!matchAnggota) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const isDuplicate = await AlumniModel.findOne({ anggotaId })

    if (isDuplicate) {
        return AppError(MESSAGES.ERROR.ALREADY.ALUMNI, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!angkatanId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!mongoose.Types.ObjectId.isValid(String(angkatanId))) {
        return AppError(`Angkatan ${MESSAGES.ERROR.INVALID.ID}`, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    const matchAngkatan = await AngkatanModel.findOne({ _id: angkatanId });

    if (!matchAngkatan) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (!company) {
        return AppError(MESSAGES.ERROR.REQUIRED.COMPANY, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!image) {
        return AppError(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}