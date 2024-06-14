import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose from 'mongoose'
import { AcaraModel } from '../../config/model/acara'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AcaraBodyDTO } from './acaraDTO'
import { acaraMapper } from './acaraResponse'
import { AcaraModelTypes, SearchAcaraTypes } from './acaraTypes'
import { acaraValidate } from './acaraValidate'

dotenv.config();

export const createAcaraService = async ({ name, description, endDate, image, isOpen, startDate }: AcaraBodyDTO, req: Request) => {

    const validate = await acaraValidate({ name: name as string, image: req.file?.path, endDate, startDate, isOpen })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const { path } = req.file as Express.Multer.File

    const newAcara = await AcaraModel.create({ name, imageUrl: path, description: description || null, isOpen, endDate, startDate })
    return newAcara
}

export const getAcaraService = async ({ name, page = 1, perPage = 10 }: SearchAcaraTypes): Promise<Result<AcaraModelTypes[]>> => {

    if (name) {

        const acaras = await AcaraModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as AcaraModelTypes[]
        const totalData = acaras.length

        const data = await acaraMapper(acaras)

        return { data, meta: Meta(page, perPage, totalData) }

    }
    const dosen = await AcaraModel.find<AcaraModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await AcaraModel.find<AcaraModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const data = await acaraMapper(res)

    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAcaraService = async ({ id }: AcaraBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const Struktural = await AcaraModel.findOne({ _id: id })

    if (!Struktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await AcaraModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateAcaraService = async ({ id, name, image, description, endDate, isOpen, startDate, }: AcaraBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchStruktural = await AcaraModel.findOne({ _id: id })

    if (!matchStruktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AcaraModelTypes> = {};

    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (image !== undefined) updateFields.imageUrl = image;
    if (isOpen !== undefined) updateFields.isOpen = isOpen;
    if (startDate !== undefined) updateFields.startDate = startDate;
    if (endDate !== undefined) updateFields.endDate = endDate;

    const updateStruktural = await AcaraModel.updateOne(
        { _id: id },
        {
            $set: updateFields

        })

    return updateStruktural;
}