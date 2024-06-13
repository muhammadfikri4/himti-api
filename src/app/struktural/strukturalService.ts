import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose, { ObjectId } from 'mongoose'
import { StrukturalModel } from '../../config/model/struktural'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { StrukturalBodyDTO } from './strukturalDTO'
import { strukturalMapper } from './strukturalResponse'
import { SearchStrukturalTypes, StrukturalModelTypes } from './strukturalTypes'
import { strukturalValidate } from './strukturalValidate'

dotenv.config();

export const createStrukturalService = async ({ name, nim, email, angkatanId, jabatan, isActive, facebook, instagram, linkedin, twitter }: StrukturalBodyDTO, req: Request) => {

    const validate = await strukturalValidate({ name: name as string, email: email as string, nim: nim as string, angkatanId: angkatanId as ObjectId, image: req.file?.path, jabatan })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const { path } = req.file as Express.Multer.File

    const newStruktural = await StrukturalModel.create({ name, email, isActive, nim, angkatanId, facebook: facebook || null, instagram, jabatan, linkedin: linkedin || null, twitter: twitter || null, imageUrl: path })
    return newStruktural
}

export const getStrukturalService = async ({ name, page = 1, perPage = 10 }: SearchStrukturalTypes) => {

    if (name) {

        const dosens = await StrukturalModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as StrukturalModelTypes[]
        const totalData = dosens.length

        const result = await strukturalMapper(dosens)

        return { result, meta: Meta(page, perPage, totalData) }

    }
    const dosen = await StrukturalModel.find<StrukturalModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await StrukturalModel.find<StrukturalModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const result = await strukturalMapper(res)

    const response = { result, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteStrukturalService = async ({ id }: StrukturalBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const Struktural = await StrukturalModel.findOne({ _id: id })

    if (!Struktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await StrukturalModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateStrukturalService = async ({ id, name, isActive, email, angkatanId, facebook, instagram, jabatan, linkedin, nim, twitter, image }: StrukturalBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchStruktural = await StrukturalModel.findOne({ _id: id })

    if (!matchStruktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<StrukturalBodyDTO> = {};

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
    if (facebook !== undefined) updateFields.facebook = facebook;
    if (instagram !== undefined) updateFields.instagram = instagram;
    if (jabatan !== undefined) updateFields.jabatan = jabatan;
    if (linkedin !== undefined) updateFields.linkedin = linkedin;
    if (nim !== undefined) updateFields.nim = nim;
    if (twitter !== undefined) updateFields.twitter = twitter;
    if (image !== undefined) updateFields.imageUrl = image;

    const updateStruktural = await StrukturalModel.updateOne(
        { _id: id },
        {
            $set: updateFields

        })

    return updateStruktural;
}