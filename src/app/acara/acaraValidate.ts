import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { AcaraBodyDTO } from './acaraDTO'

export const acaraValidate = async ({ name, image, endDate, isOpen, startDate }: AcaraBodyDTO) => {

    if (!name) {

        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpen && !startDate) {
        return AppError(MESSAGES.ERROR.REQUIRED.START_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isOpen && !endDate) {
        return AppError(MESSAGES.ERROR.REQUIRED.END_DATE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!image) {
        return AppError(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}