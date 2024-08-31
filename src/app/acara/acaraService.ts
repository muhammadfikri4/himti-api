import { Acara } from '@prisma/client'
import dotenv from 'dotenv'
import { decode } from 'jsonwebtoken'
import { TokenDecodeInterface } from '../../interface'
import { environment } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { FileType, RemoveFileFromStorage, UploadFileToStorage } from '../../utils/UploadFileToStorage'
import { getUserById } from '../authentication/authRepository'
import { AcaraBodyDTO, CreateAcaraBodyRequest, SubAcaraDTO } from './acaraDTO'
import { SubAcaraData, acaraDTOMapper, acarasDTOMapper, subAcaraMapper } from './acaraMapper'
import { createAcara, deleteAcara, getAcara, getAcaraById, getAcaraCount, updateAcara } from './acaraRepository'
import { AcaraModelTypes, IFilterAcara } from './acaraTypes'
import { acaraValidate } from './acaraValidate'

dotenv.config();

export const openValue = (open?: string) => {
    if (open?.toLowerCase().includes('true')) {
        return true
    } else if (open?.toLowerCase().includes('false')) {
        return false
    }
    return undefined
}


export const createAcaraService = async ({ name, description, endTime, image, isOpenAbsen, isOpenRegister, startTime }: CreateAcaraBodyRequest) => {
    const openRegist = typeof isOpenRegister !== 'undefined' ? JSON.parse(String(isOpenRegister)) : undefined
    const openAbsen = typeof isOpenAbsen !== 'undefined' ? JSON.parse(String(isOpenAbsen)) : undefined
    const img = image as Express.Multer.File
    const filename = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}${FileType[img?.mimetype as string]}`
    const validate = await acaraValidate({ name: name as string, image, endTime, startTime, isOpenRegister: openRegist, isOpenAbsen: openAbsen })
    if (validate instanceof ErrorApp) {
        return new ErrorApp(validate.message, validate.statusCode, validate.code)
    }
    console.log({ image })
    
    await UploadFileToStorage({
        Bucket: environment.STORAGE.BUCKET,
        Key: `assets/acara/${filename}`,
        Body: img?.buffer as Buffer,
        ContentType: img?.mimetype as string,
        ACL: 'public-read',
    })
    // const path = (image as unknown as Express.Multer.File).path
    const response = await createAcara({ name, image: filename, description, isOpenRegister: openRegist, endTime: new Date(endTime as Date), startTime: new Date(startTime as Date), isOpenAbsen: openAbsen })
    return response
}

export const getAcaraService = async ({ search, page = 1, perPage = 10, openAbsen = undefined, openRegister = undefined }: IFilterAcara) => {

    const absen = openValue(openAbsen as string)
    const regist = openValue(openRegister as string)

    const [acara, totalData] = await Promise.all([
        getAcara({ search, page, perPage, openAbsen: absen, openRegister: regist }),
        getAcaraCount({ search, openAbsen: absen, openRegister: regist })
    ])

    const data = acarasDTOMapper(acara as Acara[])
    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)

    }
    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAcaraService = async ({ id }: AcaraBodyDTO) => {

    const acara = await getAcaraById(id as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteAcara(id as string)
    return response;
}
export const updateAcaraService = async ({ id, name, image, description, endTime, isOpenAbsen, isOpenRegister, startTime, }: CreateAcaraBodyRequest) => {

    const matchAcara = await getAcaraById(id as string)

    if (!matchAcara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const img = image as Express.Multer.File
    let filename

    if (image) {
        RemoveFileFromStorage(`assets/acara/${matchAcara.image}`)
        filename = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}${FileType[img?.mimetype as string]}`
        await UploadFileToStorage({
            Bucket: environment.STORAGE.BUCKET,
            Key: `assets/acarad/${filename}`,
            Body: img?.buffer as Buffer,
            ContentType: img?.mimetype as string,
            ACL: 'public-read',
        })
    }

    const updateFields: Partial<AcaraModelTypes> = {};

    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (image) updateFields.image = filename;
    if (typeof isOpenRegister !== 'undefined') updateFields.isOpen = openValue(String(isOpenRegister));
    if (typeof isOpenAbsen !== 'undefined') updateFields.isOpenAbsen = openValue(String(isOpenAbsen));
    if (startTime) updateFields.startTime = new Date(startTime as Date);
    if (endTime) updateFields.endTime = new Date(endTime as Date);
    console.log(updateFields)
    const response = await updateAcara(updateFields, id as string)
    return response;
}

export const getDetailAcaraService = async (id: string, openAbsen?: string, token?: string) => {

    const absen = openValue(openAbsen)

    const acara = await getAcaraById(id)
    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }
    let subAcara: SubAcaraDTO[] = []

    if (token) {
        const decodeToken = decode(token)
        const userId = (decodeToken as TokenDecodeInterface)?.id
        const user = await getUserById(userId)
        if (user?.role === 'USER') {
            subAcara = []
        } else if (user?.role === 'ANGGOTA' || user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') {
            const data = subAcaraMapper(acara?.SubAcara as SubAcaraData[], userId)
            if (typeof absen === 'boolean') {
                subAcara = data.filter(i => i.isOpenAbsen === absen)
            } else {
                subAcara = data
            }
        }
    }

    const data = acaraDTOMapper(acara as unknown as Acara)

    return {
        ...data,
        subAcara
    }
}