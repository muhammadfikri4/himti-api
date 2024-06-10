import { AngkatanModel } from 'config/model/angkatan'
import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { AngkatanBodyDTO } from './angkatanDTO'

dotenv.config()

export const createAngkatanService = async ({ angkatan, isActive }: AngkatanBodyDTO) => {


    if (typeof angkatan !== 'number') {
        return AppError(MESSAGES.ERROR.INVALID.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const user = await AngkatanModel.findOne({ angkatan })
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const role = await AngkatanModel.create({ angkatan, isActive })
    return role

}
