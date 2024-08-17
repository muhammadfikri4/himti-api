import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { getAcaraById } from '../acara/acaraRepository'
import { SubAcaraBodyDTO } from './subAcaraDTO'
import { subAcaraMapper } from './subAcaraMapper'
import { createSubAcara, deleteSubAcara, getSubAcara, getSubAcaraById, getSubAcaraCount, updateSubAcara } from './subAcaraRepository'
import { IFilterSubAcara, SubAcaraModelTypes } from './subAcaraTypes'
import { acaraValidate } from './subAcaraValidate'

dotenv.config();

export const createSubAcaraService = async ({ name, description, endTime, image, startTime, acaraId }: SubAcaraBodyDTO) => {

    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, acaraId })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }
    const path = (image as unknown as Express.Multer.File)?.path

    const acara = await getAcaraById(acaraId as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await createSubAcara({ name, image: path, description, endTime, startTime, acaraId })
    return response
}

export const getSubAcaraService = async ({ search, page = 1, perPage = 10, acaraId }: IFilterSubAcara) => {

    const [subAcara, totalData] = await Promise.all([
        getSubAcara({ search, page, perPage, acaraId }),
        getSubAcaraCount({ search, acaraId })
    ])

    const data = subAcaraMapper(subAcara as unknown as SubAcaraModelTypes[])
    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)

    }
    console.log(data)
    const response = { data, meta: Meta(page, perPage, totalData) }
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
export const updateSubAcaraService = async ({ id, name, image, description, endTime, startTime, acaraId }: SubAcaraBodyDTO) => {

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

    // if (!acaraId) updateFields.acaraId = matchSubAcara.acaraId;
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (image) updateFields.image = image;
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