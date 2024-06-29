import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { DosenBodyDTO } from './dosenDTO'
import { createDosen, deleteDosen, getDosen, getDosenById, getDosenCount, updateDosen } from './dosenRepository'
import { dosenMapper } from './dosenResponse'
import { DosenModelTypes, IFilterDosen } from './dosenTypes'
import { dosenValidate } from './dosenValidate'

dotenv.config();

export const createDosenService = async ({ email, isActive, lesson, name, nidn, numberPhone }: DosenBodyDTO) => {

    const validate = await dosenValidate({ email, name, nidn })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const response = await createDosen({ email, isActive, lesson, name, nidn, numberPhone })
    return response

}

export const getDosenService = async ({ name, email, nidn, page = 1, perPage = 10 }: IFilterDosen) => {

    const [dosens, totalData] = await Promise.all([
        getDosen({ email, name, nidn, page, perPage }),
        getDosenCount({ email, name, nidn })])

    const data = dosenMapper(dosens as unknown as DosenModelTypes[])
    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteDosenService = async ({ id }: DosenBodyDTO) => {


    const matchDosen = await getDosenById(id as string)

    if (!matchDosen) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteDosen(id as string)
    return response;
}
export const updateDosenService = async ({ id, name, isActive, email, lesson, nidn, numberPhone }: DosenBodyDTO) => {


    const matchDosen = await getDosenById(id as string)

    if (!matchDosen) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const updateFields: Partial<DosenBodyDTO> = { id };

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (lesson !== undefined) updateFields.lesson = lesson;
    if (nidn !== undefined) updateFields.nidn = nidn;
    if (numberPhone !== undefined) updateFields.numberPhone = numberPhone;

    const response = await updateDosen(updateFields)
    return response;
}