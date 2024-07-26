import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose from 'mongoose'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { StrukturalBodyDTO } from './strukturalDTO'
import { createStruktural, deleteStruktural, getStruktural, getStrukturalById, getStrukturalCount, updateStruktural } from './strukturalRepository'
// import { strukturalMapper } from './strukturalResponse'
import { Jabatan } from '@prisma/client'
import { IFilterStruktural } from './strukturalTypes'
import { strukturalValidate } from './strukturalValidate'

dotenv.config();

export const createStrukturalService = async ({ anggotaId, jabatan, isActive }: StrukturalBodyDTO, req: Request) => {
    const replaceJabatan = jabatan?.toUpperCase().replace(' ', '_')
    const validate = await strukturalValidate({ anggotaId, image: req.file?.path, jabatan: replaceJabatan as Jabatan })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const { path } = req.file as Express.Multer.File

    const response = await createStruktural({ isActive, anggotaId, image: path, jabatan: replaceJabatan as Jabatan })
    return response
}

export const getStrukturalService = async ({ search, page = 1, perPage = 10 }: IFilterStruktural) => {

    const [struktural, totalData] = await Promise.all([getStruktural({ search, page, perPage }), getStrukturalCount({ search })])

    const meta = Meta(page, perPage, totalData)

    if (!struktural.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: struktural, meta }
}

export const deleteStrukturalService = async ({ id }: StrukturalBodyDTO) => {


    const Struktural = await getStrukturalById(id as string)

    if (!Struktural) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteStruktural(id as string)
    return response;
}
export const updateStrukturalService = async ({ id, isActive, jabatan, image, anggotaId }: StrukturalBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchStruktural = await getStrukturalById(id as string)

    if (!matchStruktural) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<StrukturalBodyDTO> = { id };

    if (isActive !== undefined) updateFields.isActive = isActive;
    if (anggotaId !== undefined) updateFields.anggotaId = anggotaId;
    if (jabatan !== undefined) updateFields.jabatan = jabatan;
    if (image !== undefined) updateFields.image = image;

    const response = await updateStruktural(updateFields)

    return response
}
