import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { statusValue } from '../../utils/FilterStatus'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { MemberBodyDTO } from './membersDTO'
import { MemberData, memberMapper } from './membersMapper'
import { createMember, deleteMember, getAllMember, getMemberById, getMemberCount, updateMember, updateMemberNonActive } from './membersRepository'
import { IFilterAnggota } from './membersTypes'
import { anggotaValidate } from './membersValidate'

dotenv.config();

export const createAnggotaService = async ({ name, nim, email, generationId, isActive }: MemberBodyDTO) => {

    const validate = await anggotaValidate({ name: name as string, email: email as string, nim, generationId })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const anggota = await createMember({ email, generationId, isActive, name, nim })
    return anggota
}

export const getMembersService = async ({ search, page = 1, perPage = 10, year, status }: IFilterAnggota) => {
    const st = statusValue(status as string)
    const [member, totalData] = await Promise.all([
        getAllMember({
            search,
            page,
            perPage,
            year,
            status: st
        }),
        getMemberCount({ search, year, status: st as unknown as string }, st)])

    await updateMemberNonActive()
    const data = memberMapper(member as MemberData[])
    const meta = Meta(page, perPage, totalData)


    if (!data.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return {
        data,
        meta
    }



}

export const deleteAnggotaService = async (id: string) => {

    const findAnggota = await getMemberById(id as string)

    if (!findAnggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const anggota = await deleteMember(id as string)
    return anggota;
}
export const updateAnggotaService = async ({ id, name, isActive, email, generationId, nim }: MemberBodyDTO) => {

    const matchAnggota = await getMemberById(id as string)

    if (!matchAnggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const updateFields: Partial<MemberBodyDTO> = { id };

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (generationId !== undefined) updateFields.generationId = generationId;
    if (nim !== undefined) updateFields.nim = nim.toString();

    const anggota = await updateMember(updateFields)

    return anggota;
}

export const getMemberByIdService = async (id: string) => {

    const anggota = await getMemberById(id as string)
    if (!anggota) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGGOTA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return anggota
}