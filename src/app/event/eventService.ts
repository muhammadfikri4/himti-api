import { Event } from '@prisma/client'
import dotenv from 'dotenv'
import { environment } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { FileType, RemoveFileFromStorage, UploadFileToStorage } from '../../utils/UploadFileToStorage'
import { CreateEventBodyRequest, EventBodyDTO } from './eventDTO'
import { eventDTOMapper, eventsDTOMapper } from './eventMapper'
import { createEvent, deleteAcara, getEventById, getEventCount, getEvents, updateAcara } from './eventRepository'
import { AcaraModelTypes, IFilterEvent } from './eventTypes'

dotenv.config();

export const openValue = (open?: string) => {
    if (open?.toLowerCase().includes('true')) {
        return true
    } else if (open?.toLowerCase().includes('false')) {
        return false
    }
    return undefined
}


export const createAcaraService = async ({ name, description, endTime, image, isOpen, startTime }: CreateEventBodyRequest) => {
    let filename
    if (isOpen && !startTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.START_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpen && !endTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.END_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if ((image as unknown as Express.Multer.File)?.size as number > 5242880) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    try {
        const open = typeof isOpen !== 'undefined' ? JSON.parse(String(isOpen)) : undefined
        
        const img = image as Express.Multer.File
        filename = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}${FileType[img?.mimetype as string]}`
        await UploadFileToStorage({
            Bucket: environment.STORAGE.BUCKET,
            Key: `dev/event/${filename}`,
            Body: img?.buffer as Buffer,
            ContentType: img?.mimetype as string,
            ACL: 'public-read',
        })

        const response = await createEvent({ name, image: filename, description, isOpen: open, endTime: new Date(endTime as Date), startTime: new Date(startTime as Date) })
        return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        if (error) {
            if (image) {
                    await RemoveFileFromStorage(
                        `${environment.STORAGE.ENDPOINT}/images/${filename}`,
                    )
            }
            return new ErrorApp(MESSAGE_CODE.BAD_REQUEST, 400, `${error?.message}`)
        }
    }
}

export const getAcaraService = async ({ search, page = 1, perPage = 10, openRegister = undefined }: IFilterEvent) => {

    const regist = openValue(openRegister as string)

    const [acara, totalData] = await Promise.all([
        getEvents({ search, page, perPage, openRegister: regist }),
        getEventCount({ search, openRegister: regist })
    ])

    const data = eventsDTOMapper(acara as Event[])
    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)

    }
    const response = { data, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteAcaraService = async ({ id }: EventBodyDTO) => {

    const acara = await getEventById(id as string)

    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const response = await deleteAcara(id as string)
    return response;
}
export const updateAcaraService = async ({ id, name, image, description, endTime, isOpen, startTime, }: CreateEventBodyRequest) => {

    const matchAcara = await getEventById(id as string)

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
    if (typeof isOpen !== 'undefined') updateFields.isOpen = openValue(String(isOpen));

    if (startTime) updateFields.startTime = new Date(startTime as Date);
    if (endTime) updateFields.endTime = new Date(endTime as Date);
    console.log(updateFields)
    const response = await updateAcara(updateFields, id as string)
    return response;
}

export const getDetailAcaraService = async (id: string) => {


    const acara = await getEventById(id)
    if (!acara) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ACARA, 404, MESSAGE_CODE.NOT_FOUND)
    }


    const data = eventDTOMapper(acara as unknown as Event)

    return data
}