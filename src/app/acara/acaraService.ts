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

export const openValue = (open?: string) => {
    if (open?.toLowerCase() === 'true') {
        return true
    } else if (open?.toLowerCase() === 'false') {
        return false
    }
    return undefined
}


export const createAcaraService = async ({ name, description, endTime, image, isOpenAbsen, isOpenRegister, startTime }: AcaraBodyDTO) => {
    const openRegist = typeof isOpenRegister !== 'undefined' ? JSON.parse(String(isOpenRegister)) : undefined
    const openAbsen = typeof isOpenAbsen !== 'undefined' ? JSON.parse(String(isOpenAbsen)) : undefined

    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, isOpenRegister: openRegist, isOpenAbsen: openAbsen })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }
    const path = (image as unknown as Express.Multer.File).path
    const response = await createAcara({ name, image: path, description, isOpenRegister: openRegist, endTime, startTime, isOpenAbsen: openAbsen })
    return response
}

export const getAcaraService = async ({ search, page = 1, perPage = 10, openAbsen = undefined, openRegister = undefined }: IFilterAcara) => {

    const absen = openValue(openAbsen as string)
    const regist = openValue(openRegister as string)

    const [acara, totalData] = await Promise.all([
        getAcara({ search, page, perPage, openAbsen: absen, openRegister: regist }),
        getAcaraCount({ search, openAbsen: absen, openRegister: regist })
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
export const updateAcaraService = async ({ id, name, image, description, endTime, isOpenAbsen, isOpenRegister, startTime, }: AcaraBodyDTO) => {

    const matchAcara = await getAcaraById(id as string)

    if (!matchAcara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AcaraModelTypes> = {};

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (image) updateFields.image = image;
    if (typeof isOpenRegister === 'boolean') updateFields.isOpen = JSON.parse(String(isOpenRegister));
    if (typeof isOpenAbsen === 'boolean') updateFields.isOpenAbsen = JSON.parse(String(isOpenAbsen));
    if (startTime) updateFields.startTime = startTime;
    if (endTime) updateFields.endTime = endTime;
    console.log(updateFields)
    const response = await updateAcara(updateFields, id as string)
    return response;
}

export const getDetailAcaraService = async (id: string, openAbsen?: string, token?: string) => {

    const absen = openValue(openAbsen)
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