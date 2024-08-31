import { Generation } from '@prisma/client'
import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { statusValue } from '../../utils/FilterStatus'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { getMemberByGenerationId } from '../members/membersRepository'
import { GenerationBodyDTO, IFilterGeneration } from './generationsDTO'
import { generationMapper } from './generationsMapper'
import { createGeneration, deleteGeneration, getGenerationById, getGenerationByYear, getGenerationCount, getGenerations, getMatchGenerationExceptSameId, updateGeneration } from './generationsRepository'

dotenv.config()

export const createGenerationService = async ({ year, isActive }: GenerationBodyDTO) => {

    const year_string = year?.toString()

    if (!year) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ANGKATAN_YEAR, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAngkatan = await getGenerationByYear(year_string as string)
    if (matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const response = await createGeneration({ isActive, year: year_string as string })
    return response

}

export const getGenerationService = async ({ search, page = 1, perPage = 10, status }: IFilterGeneration) => {

    const st = statusValue(status as string)

    const [generation, totalData] = await Promise.all([
        getGenerations({ page, perPage, search }),
        getGenerationCount({ search })
    ])

    const data = generationMapper(generation as Generation[])
    const meta = Meta(page, perPage, totalData)

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

export const deleteGenerationService = async ({ id }: GenerationBodyDTO) => {

    if (!id) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await getGenerationById(id)

    if (!matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const isUsed = await getMemberByGenerationId(id)
    if (isUsed) {
        return new ErrorApp(MESSAGES.ERROR.RELATION.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const response = await deleteGeneration(id)
    return response
}
export const updateGenerationService = async ({ id, year, isActive }: GenerationBodyDTO) => {

    const year_string = year?.toString()
    const matchAngkatan = await getGenerationById(id as string)

    if (!matchAngkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (year) {

        const isAlreadyUse = await getMatchGenerationExceptSameId(year_string as string)

        if (isAlreadyUse && isAlreadyUse.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }

    const updateFields = { id } as GenerationBodyDTO
    if (year !== undefined) updateFields.year = year.toString();
    if (isActive !== undefined) updateFields.isActive = isActive;

    const response = await updateGeneration(updateFields)
    return response
}

export const getGenerationByIdService = async (id: string) => {
    const angkatan = await getGenerationById(id)
    if (!angkatan) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return angkatan
}