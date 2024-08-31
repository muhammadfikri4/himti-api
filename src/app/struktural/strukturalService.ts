import dotenv from 'dotenv'
import { type Request } from 'express'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { StructuralBodyDTO } from './strukturalDTO'
import { createStructural, deleteStructural, getStructural, getStructuralByAnggotaId, getStructuralById, getStructuralByJabatan, getStructuralCount, updateStructural } from './strukturalRepository'
// import { strukturalMapper } from './strukturalResponse'
import { Jabatan } from '@prisma/client'
import { structuralMapper } from './strukturalMapper'
import { IFilterStructural } from './strukturalTypes'
import { strukturalValidate } from './strukturalValidate'

dotenv.config();

export const jabatanChecker = (jabatan: string) => {
    return (jabatan === 'KETUA_HIMPUNAN') || (jabatan === 'WAKIL_KETUA_HIMPUNAN') || jabatan === 'SEKRETARIS' || jabatan === 'BENDAHARA' || jabatan === 'KETUA_DEPARTMENT'
}

export const createStrukturalService = async ({ memberId, jabatan, isActive }: StructuralBodyDTO, req: Request) => {
    const replaceJabatan = jabatan?.toUpperCase().replace(/ /g, '_')
    const validate = await strukturalValidate({ memberId, image: req.file?.path, jabatan: replaceJabatan as Jabatan })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }

    const { path } = req.file as Express.Multer.File

    const status = typeof isActive !== 'undefined' ? JSON.parse(String(isActive)) : undefined

    const response = await createStructural({ isActive: status, memberId, image: path, jabatan: replaceJabatan as Jabatan })
    return response
}

export const getStrukturalService = async ({ search, page = 1, perPage = 10 }: IFilterStructural) => {

    const [struktural, totalData] = await Promise.all([
        getStructural({ search, page, perPage }), 
        getStructuralCount({ search })
    ])

    const meta = Meta(page, perPage, totalData)
    const data = structuralMapper(struktural)
    if (!data.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data, meta }
}

export const deleteStrukturalService = async ({ id }: StructuralBodyDTO) => {


    const Struktural = await getStructuralById(id as string)

    if (!Struktural) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteStructural(id as string)
    return response;
}
export const updateStrukturalService = async ({ id, isActive, jabatan, image, memberId }: StructuralBodyDTO) => {

    const matchStruktural = await getStructuralById(id as string)
    const replaceJabatan = jabatan?.toUpperCase().replace(/ /g, '_') as Jabatan
    const jabatanIsValid = jabatanChecker(replaceJabatan)

    if (jabatan && !jabatanIsValid) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.JABATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!matchStruktural) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
    }
    if (memberId || jabatan) {
        const anggotaIsStruktural = await getStructuralByAnggotaId(memberId as string)
        if (anggotaIsStruktural && anggotaIsStruktural.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.ANGGOTA_STRUKTURAL, 400, MESSAGE_CODE.BAD_REQUEST)
        }
        const jabatanIsAlready = await getStructuralByJabatan(jabatan as Jabatan)
        if (jabatanIsAlready && jabatanIsAlready.id !== id) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.JABATAN, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }


    const updateFields: Partial<StructuralBodyDTO> = { id };

    if (isActive !== undefined) updateFields.isActive = JSON.parse(String(isActive));
    if (memberId !== undefined) updateFields.memberId = memberId;
    if (jabatan !== undefined) updateFields.jabatan = replaceJabatan;
    if (image !== undefined) updateFields.image = image;

    const response = await updateStructural(updateFields)

    return response
}
