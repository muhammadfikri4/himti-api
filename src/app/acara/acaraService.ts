import { Acara } from '@prisma/client'
import dotenv from 'dotenv'
import { TokenDecodeInterface } from 'interface'
import { decode } from 'jsonwebtoken'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { getUserById } from '../authentication/authRepository'
import { AcaraBodyDTO } from './acaraDTO'
import { acaraMapper, subAcaraMapper } from './acaraMapper'
import { createAcara, deleteAcara, getAcara, getAcaraById, getAcaraCount, getSubAcaraByAcaraId, updateAcara } from './acaraRepository'
import { AcaraModelTypes, IFilterAcara } from './acaraTypes'
import { acaraValidate } from './acaraValidate'

dotenv.config();

export const isAbsenValue = (open?: string) => {
    if (open === 'true') {
        return true
    } else if (open === 'false') {
        return false
    }
    return undefined
}

export const createAcaraService = async ({ name, description, endTime, image, isOpen, startTime }: AcaraBodyDTO) => {
    const open = typeof isOpen !== 'undefined' ? JSON.parse(String(isOpen)) : undefined
    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, isOpen: open })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }
    const path = (image as unknown as Express.Multer.File).path
    const response = await createAcara({ name, image: path, description, isOpen: open, endTime, startTime })
    return response
}

export const getAcaraService = async ({ name, page = 1, perPage = 10 }: IFilterAcara) => {

    const [acara, totalData] = await Promise.all([
        getAcara({ name, page, perPage }),
        getAcaraCount({ name })
    ])

    const data = await acaraMapper(acara as unknown as AcaraModelTypes[])
    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)

    }
    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAcaraService = async ({ id }: AcaraBodyDTO) => {

    const acara = await getAcaraById(id as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteAcara(id as string)
    return response;
}
export const updateAcaraService = async ({ id, name, image, description, endTime, isOpen, startTime, }: AcaraBodyDTO) => {

    const matchAcara = await getAcaraById(id as string)

    if (!matchAcara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AcaraModelTypes> = {};

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (image) updateFields.image = image;
    if (isOpen) updateFields.isOpen = JSON.parse(String(isOpen));
    if (startTime) updateFields.startTime = startTime;
    if (endTime) updateFields.endTime = endTime;

    const response = await updateAcara(updateFields, id as string)
    return response;
}

export const getDetailAcaraService = async (id: string, isAbsen?: string, token?: string) => {

    const absen = isAbsenValue(isAbsen)
    let subAcara: Array<Acara | null | Promise<Acara>> = []

    if (!token) {
        subAcara = []
    }

    if (token) {
        const decodeToken = decode(token)
        const userId = (decodeToken as TokenDecodeInterface)?.id
        const user = await getUserById(userId)
        if (user?.role === 'USER' && !user.anggotaId) {
            subAcara = []
        } else if (user?.role === 'ANGGOTA' || user?.role === 'ADMIN') {
            const sub = await getSubAcaraByAcaraId(id, absen) || []
            subAcara = await subAcaraMapper(sub, userId)

        }
    }

    const acara = await getAcaraById(id)
    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return {
        ...acara,
        subAcara
    }
}