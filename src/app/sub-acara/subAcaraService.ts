import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { getAcaraById } from '../acara/acaraRepository'
import { SubAcaraBodyDTO } from './subAcaraDTO'
import { createSubAcara, deleteSubAcara, getSubAcara, getSubAcaraById, getSubAcaraCount, updateSubAcara } from './subAcaraRepository'
import { IFilterSubAcara, SubAcaraModelTypes } from './subAcaraTypes'
import { acaraValidate } from './subAcaraValidate'

dotenv.config();

export const createSubAcaraService = async ({ name, description, endTime, image, isOpen, startTime, acaraId }: SubAcaraBodyDTO) => {
    const open = typeof isOpen !== 'undefined' ? JSON.parse(String(isOpen)) : undefined
    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, isOpen: open, acaraId })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }
    const path = (image as unknown as Express.Multer.File).path

    const acara = await getAcaraById(acaraId as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await createSubAcara({ name, image: path, description, isOpen: open, endTime, startTime, acaraId })
    return response
}

export const getSubAcaraService = async ({ search, page = 1, perPage = 10, acaraId }: IFilterSubAcara) => {

    const [subAcara, totalData] = await Promise.all([
        getSubAcara({ search, page, perPage, acaraId }),
        getSubAcaraCount({ search, acaraId })
    ])

    if (!subAcara.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)

    }
    const response = { data: subAcara, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteSubAcaraService = async ({ id }: SubAcaraBodyDTO) => {

    const acara = await getSubAcaraById(id as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteSubAcara(id as string)
    return response;
}
export const updateSubAcaraService = async ({ id, name, image, description, endTime, isOpen, startTime, acaraId }: SubAcaraBodyDTO) => {

    const matchSubAcara = await getSubAcaraById(id as string)

    if (!matchSubAcara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (acaraId) {
        const acara = await getAcaraById(acaraId as string)
        if (!acara) {
            return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
        }
    }

    const updateFields: Partial<SubAcaraModelTypes> = {};

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (image) updateFields.image = image;
    if (isOpen) updateFields.isOpen = JSON.parse(String(isOpen));
    if (startTime) updateFields.startTime = startTime;
    if (endTime) updateFields.endTime = endTime;

    const response = await updateSubAcara(updateFields, id as string)
    return response;
}

export const getDetailSubAcaraService = async (id: string) => {

    const acara = await getSubAcaraById(id)
    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return acara
}