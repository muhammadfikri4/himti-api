import dotenv from 'dotenv'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AcaraBodyDTO } from './acaraDTO'
import { createAcara, deleteAcara, getAcara, getAcaraById, getAcaraCount, updateAcara } from './acaraRepository'
import { acaraMapper } from './acaraResponse'
import { AcaraModelTypes, IFilterAcara } from './acaraTypes'
import { acaraValidate } from './acaraValidate'

dotenv.config();

export const createAcaraService = async ({ name, description, endTime, image, isOpen, startTime }: AcaraBodyDTO) => {

    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, isOpen })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }


    const newAcara = await createAcara({ name, image, description, isOpen, endTime, startTime })
    return newAcara
}

export const getAcaraService = async ({ name, page = 1, perPage = 10 }: IFilterAcara): Promise<Result<AcaraModelTypes[]>> => {

    const [acara, totalData] = await Promise.all([
        getAcara({ name, page, perPage }),
        getAcaraCount({ name })
    ])

    const data = await acaraMapper(acara as unknown as AcaraModelTypes[])
    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAcaraService = async ({ id }: AcaraBodyDTO) => {

    const acara = await getAcaraById(id as string)

    if (!acara) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteAcara(id as string)
    return response;
}
export const updateAcaraService = async ({ id, name, image, description, endTime, isOpen, startTime, }: AcaraBodyDTO) => {

    const matchStruktural = await getAcaraById(id as string)

    if (!matchStruktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AcaraModelTypes> = {};

    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (image !== undefined) updateFields.image = image;
    if (isOpen !== undefined) updateFields.isOpen = JSON.parse(String(isOpen));
    if (startTime !== undefined) updateFields.startTime = startTime;
    if (endTime !== undefined) updateFields.endTime = endTime;

    const response = await updateAcara(updateFields, id as string)

    return response;
}