import dotenv from 'dotenv'
import { Repository } from 'redis-om'
import { Pagination } from 'utils/Pagination'
import { anggotaSchema } from '../../schema/anggota'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { statusValue } from '../../utils/FilterStatus'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { redis } from '../../utils/Redis'
import { AnggotaBodyDTO } from './anggotaDTO'
import { AnggotaData, anggotaMapper } from './anggotaMapper'
import { createAnggota, deleteAnggota, getAnggota, getAnggotaById, getAnggotaCount, getAnggotas, updateAnggota } from './anggotaRepository'
import { IFilterAnggota } from './anggotaTypes'
import { anggotaValidate } from './anggotaValidate'
import { GetAnggotaQuery } from './redis.repository'

dotenv.config();
const anggotaRepository = new Repository(anggotaSchema, redis)
// const redis = RedisFunction<Anggota & { angkatan: Angkatan }>(REDIS_KEY.ANGGOTA)

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
    // await redis.connect()
    // const redisData = await RedisFunction.get<(Anggota & { angkatan: Angkatan })[]>(REDIS_KEY.ANGGOTA)
    await anggotaRepository.createIndex()
    const redisData = await anggotaRepository.search().returnCount()
    // const redisData = await redis.get<Anggota & Angkatan>(page, perPage)
    // const totalData = await redis.getAll()
    // console.log({ redisData })

    console.log(redisData)
    if (!redisData) {
        const anggotas = await getAnggotas()
        // await RedisFunction.set(REDIS_KEY.ANGGOTA, anggotas)
        await anggotaRepository.save(anggotas)
        const [anggota, totalData] = await Promise.all([
            getAnggota({
                search,
                page,
                perPage,
                year,
            }),
            getAnggotaCount({ search, year, status: st as unknown as string }, st)])

        const data = anggotaMapper(anggota as AnggotaData[])
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

            result = data.filter(i => i.isActive === st)
        }
        // await redis.quit()

        return {
            data: result,
            meta
        }

    }

    // const datas = await anggotaRepository.search()
    //     .where('name')
    //     .equals(search as string)
    //     .or('nim')
    //     .equals(search as string)
    //     .or('isActive')
    //     .match(st as boolean)
    //     .return.all()
    // console.log({ datas })
    // const dataParse = anggotaDTOMapperFromRedis(datas)
    // const data = Pagination(
    //     dataParse,
    //     page,
    //     perPage)

    const data = await GetAnggotaQuery(search, st)
    const result = Pagination(data)
    const meta = Meta(page, perPage, data.length)
    // if (typeof st === 'boolean') {
    //     const filter = redisData.filter(i => i.isActive === st)
    //     data = Pagination(filter, page, perPage)
    // }
    // const filter = redisData.filter(i =>
    //     i.name.toLowerCase().includes(search as string) ||
    //     i.nim?.toLowerCase().includes(search as string) ||
    //     i.isActive === st
    // )
    // console.log(filter)
    // data = Pagination(filter, page, perPage)
    // const meta = Meta(page, perPage, data.length)

    // await redis.quit()
    return {
        data: result,
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

export const getAnggotaByIdService = async (id: string) => {

    const anggota = await getAnggotaById(id as string)
    if (!anggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return anggota
}