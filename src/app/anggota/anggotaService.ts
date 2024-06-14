import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { AnggotaModel } from '../../config/model/anggota'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AnggotaBodyDTO } from './anggotaDTO'
import { strukturalMapper } from './anggotaResponse'
import { AnggotaModelTypes, SearchAnggotaTypes } from './anggotaTypes'
import { anggotaValidate } from './anggotaValidate'

dotenv.config();

export const createAnggotaService = async ({ name, nim, email, angkatanId, isActive }: AnggotaBodyDTO, req: Request) => {

    const validate = await anggotaValidate({ name: name as string, email: email as string, nim: nim as string, angkatanId: angkatanId as ObjectId })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const newStruktural = await AnggotaModel.create({ name, email, isActive, nim, angkatanId })
    return newStruktural
}

export const getAnggotaService = async ({ name, page = 1, perPage = 10 }: SearchAnggotaTypes): Promise<Result> => {

    if (name) {

        const dosens = await AnggotaModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as AnggotaModelTypes[]
        const totalData = dosens.length

        const data = await strukturalMapper(dosens)

        return { data, meta: Meta(page, perPage, totalData) }

    }
    const dosen = await AnggotaModel.find<AnggotaModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await AnggotaModel.find<AnggotaModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const data = await strukturalMapper(res)

    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAnggotaService = async ({ id }: AnggotaBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const Struktural = await AnggotaModel.findOne({ _id: id })

    if (!Struktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await AnggotaModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateAnggotaService = async ({ id, name, isActive, email, angkatanId, nim }: AnggotaBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAnggota = await AnggotaModel.findOne({ _id: id })

    if (!matchAnggota) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AnggotaBodyDTO> = {};

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
    if (nim !== undefined) updateFields.nim = nim;

    const updateStruktural = await AnggotaModel.updateOne(
        { _id: id },
        {
            $set: updateFields

        })

    return updateStruktural;
}