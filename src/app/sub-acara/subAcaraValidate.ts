import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { SubAcaraBodyDTO } from './subAcaraDTO'

export const acaraValidate = async ({ name, image, endTime, isOpen, startTime, acaraId }: SubAcaraBodyDTO) => {

    if (!name) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!acaraId) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.ACARA_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpen && !startTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.START_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpen && !endTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.END_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    if (!image) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if ((image as unknown as Express.Multer.File)?.size as number > 5242880) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}