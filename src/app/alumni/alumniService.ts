import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { AlumniModel } from '../../config/model/alumni'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AlumniBodyDTO } from './alumniDTO'
import { alumniMapper } from './alumniResponse'
import { AlumniModelTypes, SearchAlumniTypes } from './alumniTypes'
import { alumniValidate } from './alumniValidate'

dotenv.config();

export const createAlumniService = async ({ angkatanId, isActive, company, anggotaId, image }: AlumniBodyDTO) => {

    const validate = await alumniValidate({ angkatanId, image, anggotaId, company })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const newStruktural = await AlumniModel.create({ isActive, angkatanId, company: company || null, imageUrl: image, anggotaId })
    return newStruktural
}

export const getAlumniService = async ({ name, page = 1, perPage = 10 }: SearchAlumniTypes): Promise<Result<AlumniModelTypes[]>> => {

    if (name) {

        const dosens = await AlumniModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as AlumniModelTypes[]
        const totalData = dosens.length

        const data = await alumniMapper(dosens)

        return { data, meta: Meta(page, perPage, totalData) }

    }
    const dosen = await AlumniModel.find<AlumniModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await AlumniModel.find<AlumniModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const data = await alumniMapper(res)

    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAlumniService = async ({ id }: AlumniBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const Struktural = await AlumniModel.findOne({ _id: id })

    if (!Struktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await AlumniModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateAlumniService = async ({ id, isActive, angkatanId, anggotaId, company, image }: AlumniBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchStruktural = await AlumniModel.findOne({ _id: id })

    if (!matchStruktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AlumniBodyDTO> = {};

    if (isActive !== undefined) updateFields.isActive = isActive;
    if (image !== undefined) updateFields.imageUrl = image;
    if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
    if (anggotaId !== undefined) updateFields.anggotaId = anggotaId;
    if (company !== undefined) updateFields.imageUrl = company;

    const updateStruktural = await AlumniModel.updateOne(
        { _id: id },
        {
            $set: updateFields

        })

    return updateStruktural;
}