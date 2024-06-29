import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { REGEX } from '../../utils/Regex'
import { getAnggotaByAngkatanId } from '../anggota/anggotaRepository'
import { AngkatanBodyDTO } from './angkatanDTO'
import { createAngkatan, deleteAngkatanRepository, getAngkatan, getAngkatanById, getAngkatanByYear, getProductsCount, updateAngkatan } from './angkatanRepository'
import { angkatanMapper } from './angkatanResponse'
import { AngkatanModelTypes, IFilterAngkatan } from './angkatanTypes'

dotenv.config()

export const createAngkatanService = async ({ year, isActive }: AngkatanBodyDTO) => {

    const year_string = year?.toString()

    if (!year) {
        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_YEAR, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!REGEX.number.test(year_string as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchAngkatan = await getAngkatanByYear(year_string as string)
    if (matchAngkatan) {
        return AppError(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const newAngkatan = await createAngkatan({ isActive, year: year_string as string })
    return newAngkatan

}

export const getAngkatanService = async ({ search, page = 1, perPage = 10, }: IFilterAngkatan): Promise<Result<AngkatanModelTypes[]>> => {

    const [angkatan, totalData] = await Promise.all([getAngkatan({ page, perPage, search }), getProductsCount({ search })])

    const data = angkatanMapper(angkatan)
    return { data, meta: Meta(page, perPage, totalData) }
}

export const deleteAngkatanService = async ({ id }: AngkatanBodyDTO) => {

    if (!id) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await getAngkatanById(id)

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const isUsed = await getAnggotaByAngkatanId(id)
    if (isUsed) {
        return AppError(MESSAGES.ERROR.RELATION.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    return await deleteAngkatanRepository(id)
}
export const updateAngkatanService = async ({ id, year, isActive }: AngkatanBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await getAngkatanById(id as string)

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields = {} as AngkatanBodyDTO
    if (year !== undefined) updateFields.year = year;
    if (isActive !== undefined) updateFields.isActive = isActive;
    return await updateAngkatan(updateFields)

}