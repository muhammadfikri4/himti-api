import { type NextFunction, type Request, type Response } from 'express'
import { AngkatanModel } from '../../config/model/angkatan'
import { StrukturalModel } from '../../config/model/struktural'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'

export const strukturalValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { name, nim, email, angkatanId } = req.body
    if (!nim) {

        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NIM)
    }
    if (!name) {

        return AppError(MESSAGE_CODE.BAD_REQUEST, 400, MESSAGES.ERROR.REQUIRED.NAME)
    }
    if (email && !REGEX.email.test(email as string)) {

        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIM = await StrukturalModel.findOne({ nim })
    if (matchNIM) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await StrukturalModel.findOne({ email })
    if (matchEmail) {

        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!angkatanId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAngkatan = await AngkatanModel.findOne({ _id: angkatanId })

    if (!matchAngkatan) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }
    next()
    return false
}