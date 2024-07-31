import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { ErrorApp } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { AcaraBodyDTO } from './acaraDTO'

export const acaraValidate = async ({ name, image, endTime, isOpenRegister, startTime }: AcaraBodyDTO) => {

    if (!name) {

        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpenRegister && !startTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.START_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpenRegister && !endTime) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.END_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    if (!image) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if ((image as unknown as Express.Multer.File)?.size as number > 5242880) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}