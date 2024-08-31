import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { IFilterLecturer, LecturerBodyDTO } from './lecturersDTO'
import { createDosen, deleteDosen, getDosen, getDosenById, getDosenCount, updateDosen } from './lecturersRepository'
import { createLecturerValidate } from './lecturersValidate'

dotenv.config();

export const createLecturerService = async ({ email, isActive, lesson, name, nidn, numberPhone }: LecturerBodyDTO) => {

    const validate = await createLecturerValidate({ email, name, nidn })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const response = await createDosen({ email, isActive, lesson, name, nidn, numberPhone })
    return response

}

export const getLecturerService = async ({ search, page = 1, perPage = 10 }: IFilterLecturer) => {

    const [dosens, totalData] = await Promise.all([
        getDosen({ search, page, perPage }),
        getDosenCount({ search })])

    const meta = Meta(page, perPage, totalData)

    if (!dosens.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: dosens, meta }
}

export const deleteLecturerService = async ({ id }: LecturerBodyDTO) => {


    const matchDosen = await getDosenById(id as string)

    if (!matchDosen) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteDosen(id as string)
    return response;
}
export const updateLecturerService = async ({ id, name, isActive, email, lesson, nidn, numberPhone }: LecturerBodyDTO) => {


    const matchDosen = await getDosenById(id as string)

    if (!matchDosen) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const updateFields: Partial<LecturerBodyDTO> = { id };

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (lesson !== undefined) updateFields.lesson = lesson;
    if (nidn !== undefined) updateFields.nidn = nidn;
    if (numberPhone !== undefined) updateFields.numberPhone = numberPhone;

    const response = await updateDosen(updateFields)
    return response;
}