import { Anggota, Angkatan } from '@prisma/client'
import dotenv from 'dotenv'
import { REDIS_KEY, RedisFunction } from 'utils/Redis'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { statusValue } from '../../utils/FilterStatus'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { AnggotaBodyDTO } from './anggotaDTO'
import { anggotaMapper } from './anggotaMapper'
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, getAnggotaCount, getAnggotas, updateAnggota } from './anggotaRepository'
import { AnggotaModelTypes, IFilterAnggota } from './anggotaTypes'
import { anggotaValidate } from './anggotaValidate'

dotenv.config();

const redis = RedisFunction<Anggota & { angkatan: Angkatan }>(REDIS_KEY.ANGGOTA)

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

    const redisData = await redis.get<Anggota & Angkatan>(page, perPage)
    // const RD = await redis.getAll()
    console.log({ redisData })
    if (!redisData.items.length) {
        const anggotas = await getAnggotas()
        await redis.set(anggotas)

        const [anggota, totalData] = await Promise.all([
            getAnggota({
                search,
                page,
                perPage,
                year,
            }),
            getAnggotaCount({ search, year, status: st as unknown as string }, st)])

        const data = anggotaMapper(anggota as unknown as AnggotaModelTypes[])
        const meta = Meta(page, perPage, totalData)

        if (!data.length && !meta.totalPages && !meta.totalData) {
            return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
        }

        let result = data
        if (typeof st === 'boolean') {
            const anggota = await getAnggota({
                search,
                page: 1,
                perPage: 9999999,
                year,
            })
            const map = anggotaMapper(anggota as unknown as AnggotaModelTypes[])
            result = map.filter(i => i.isActive === st)
        }

        return {
            data: result,
            meta
        }

    }

    return {
        data: redisData.items.map(item => ({
            redisId: item.id,
            id: item.data.id,
            name: item.data.name,
            email: item.data.email,
            nim: item.data.nim,
            isActive: item.data.isActive,
            instagram: item.data.instagram,
            facebook: item.data.facebook,
            twitter: item.data.twitter,
            linkedin: item.data.linkedin,
            angkatan: {
                id: item.data.angkatan.id,
                year: item.data.angkatan.year,
                isActive: item.data.angkatan.isActive
            }
        })),
        meta: '1'
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

export const getAnggotaByIdService = async (id: string) => {

    const anggota = await getAnggotaById(id as string)
    if (!anggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return anggota
}