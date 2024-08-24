import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { statusValue } from '../../utils/FilterStatus'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { REDIS_KEY, RedisFunction } from '../../utils/Redis'
import { getAnggotaByAngkatanId } from '../anggota/anggotaRepository'
import { AngkatanBodyDTO } from './angkatanDTO'
import { createAngkatan, deleteAngkatanRepository, getAngkatan, getAngkatanById, getAngkatanByYear, getAngkatanCount, getMatchAngkatanExceptSameId, updateAngkatan } from './angkatanRepository'
import { angkatanMapper } from './angkatanResponse'
import { IFilterAngkatan } from './angkatanTypes'

dotenv.config()

export const createAngkatanService = async ({ year, isActive }: AngkatanBodyDTO) => {

    const year_string = year?.toString()

    if (!year) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ANGKATAN_YEAR, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAngkatan = await getAngkatanByYear(year_string as string)
    if (matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const response = await createAngkatan({ isActive, year: year_string as string })
    return response

}

export const getAngkatanService = async ({ search, page = 1, perPage = 10, status }: IFilterAngkatan) => {

    const st = statusValue(status as string)

    const [angkatan, totalData] = await Promise.all([getAngkatan({ page, perPage, search }), getAngkatanCount({ search })])

    const data = angkatanMapper(angkatan)
    const meta = Meta(page, perPage, totalData)
    await RedisFunction.set(REDIS_KEY.ANGKATAN, data)

    let result = data

    if (typeof st === 'boolean') {
        result = data.filter(i => i.isActive === st)
    }

    if (!result.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return {
        data: result,
        meta
    }
}

export const deleteAngkatanService = async ({ id }: AngkatanBodyDTO) => {

    if (!id) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await getAngkatanById(id)

    if (!matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const isUsed = await getAnggotaByAngkatanId(id)
    if (isUsed) {
        return new ErrorApp(MESSAGES.ERROR.RELATION.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const response = await deleteAngkatanRepository(id)
    return response
}
export const updateAngkatanService = async ({ id, year, isActive }: AngkatanBodyDTO) => {

    const year_string = year?.toString()
    const matchAngkatan = await getAngkatanById(id as string)

    if (!matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (year) {

        const isAlreadyUse = await getMatchAngkatanExceptSameId(year_string as string)

        if (isAlreadyUse && isAlreadyUse.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }

    const updateFields = { id } as AngkatanBodyDTO
    if (year !== undefined) updateFields.year = year.toString();
    if (isActive !== undefined) updateFields.isActive = isActive;

    const response = await updateAngkatan(updateFields)
    return response
}

export const getAngkatanByIdService = async (id: string) => {
    const angkatan = await getAngkatanById(id)
    if (!angkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return angkatan
}