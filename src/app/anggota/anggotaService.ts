import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose from 'mongoose'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AnggotaBodyDTO } from './anggotaDTO'
import { anggotaMapper } from './anggotaMapper'
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, getAnggotaCount, updateAnggota } from './anggotaRepository'
import { AnggotaModelTypes, IFilterAnggota } from './anggotaTypes'
import { anggotaValidate } from './anggotaValidate'

dotenv.config();

export const createAnggotaService = async ({ name, nim, email, angkatanId, isActive }: AnggotaBodyDTO, req: Request) => {

    const validate = await anggotaValidate({ name: name as string, email: email as string, nim, angkatanId })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const anggota = await createAnggota({ email, angkatanId, isActive, name, nim })
    return anggota
}

export const getAnggotaService = async ({ search, page = 1, perPage = 10, year }: IFilterAnggota) => {

    const [anggota, totalData] = await Promise.all([getAnggota({ search, page, perPage, year }), getAnggotaCount({ search, year })])

    const data = await anggotaMapper(anggota as unknown as AnggotaModelTypes[])

    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return {
        data,
        meta: Meta(page, perPage, totalData)
    }

}

export const deleteAnggotaService = async ({ id }: AnggotaBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const findAnggota = await getAnggotaById(id as string)

    if (!findAnggota) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const anggota = await deleteAnggota(id as string)
    return anggota;
}
export const updateAnggotaService = async ({ id, name, isActive, email, angkatanId, nim }: AnggotaBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAnggota = await getAnggotaById(id as string)

    if (!matchAnggota) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AnggotaBodyDTO> = {};

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
    if (nim !== undefined) updateFields.nim = nim.toString();

    const updateStruktural = await updateAnggota(updateFields)

    return updateStruktural;
}