import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AnggotaBodyDTO } from './anggotaDTO'
import { anggotaMapper } from './anggotaMapper'
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, getAnggotaCount, updateAnggota } from './anggotaRepository'
import { AnggotaModelTypes, IFilterAnggota } from './anggotaTypes'
import { anggotaValidate } from './anggotaValidate'

dotenv.config();

export const statusValue = (status: string) => {
    if (status?.toLowerCase() === 'active') {
        return true
    } else if (status?.toLowerCase() === 'nonactive') {
        return false
    }
    return undefined
}


export const createAnggotaService = async ({ name, nim, email, angkatanId, isActive }: AnggotaBodyDTO) => {

    const validate = await anggotaValidate({ name: name as string, email: email as string, nim, angkatanId })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const anggota = await createAnggota({ email, angkatanId, isActive, name, nim })
    return anggota
}

export const getAnggotaService = async ({ search, page = 1, perPage = 10, year, status }: IFilterAnggota) => {
    const st = statusValue(status as string)

    const [anggota, totalData] = await Promise.all([
        getAnggota({
            search,
            page,
            perPage,
            year,

        }, st),
        getAnggotaCount({ search, year, status: st as unknown as string })])

    const data = await anggotaMapper(anggota as unknown as AnggotaModelTypes[])
    const meta = Meta(page, perPage, totalData)

    if (!data.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return {
        data,
        meta
    }

}

export const deleteAnggotaService = async ({ id }: AnggotaBodyDTO) => {

    const findAnggota = await getAnggotaById(id as string)

    if (!findAnggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const anggota = await deleteAnggota(id as string)
    return anggota;
}
export const updateAnggotaService = async ({ id, name, isActive, email, angkatanId, nim }: AnggotaBodyDTO) => {

    const matchAnggota = await getAnggotaById(id as string)

    if (!matchAnggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<AnggotaBodyDTO> = { id };

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
    if (nim !== undefined) updateFields.nim = nim.toString();

    const anggota = await updateAnggota(updateFields)

    return anggota;
}