import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { AngkatanModel } from '../../config/model/angkatan'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { AngkatanBodyDTO } from './angkatanDTO'
import { angkatanMapper } from './angkatanResponse'
import { AngkatanModelTypes, SearchAngkatanTypes } from './angkatanTypes'

dotenv.config()

export const createAngkatanService = async ({ angkatan, isActive }: AngkatanBodyDTO) => {

    if (!angkatan) {
        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (typeof angkatan !== 'number') {
        return AppError(MESSAGES.ERROR.INVALID.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchAngkatan = await AngkatanModel.findOne({ angkatan })
    if (matchAngkatan) {
        return AppError(MESSAGES.ERROR.ALREADY.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const newAngkatan = await AngkatanModel.create({ angkatan, isActive })
    return newAngkatan

}

export const getAngkatanService = async ({ search }: SearchAngkatanTypes) => {

    if (search) {
        const angkatan = await AngkatanModel.aggregate([
            {
                $addFields: {
                    angkatanStr: { $toString: "$angkatan" }
                }
            },
            {
                $match: {
                    angkatanStr: { $regex: search, $options: 'i' }
                }
            }
        ]);

        const result = angkatanMapper(angkatan)
        return result

    }
    const angkatan = await AngkatanModel.find<AngkatanModelTypes>()

    const result = angkatanMapper(angkatan)
    return result
}

export const deleteAngkatanService = async ({ id }: AngkatanBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await AngkatanModel.findOne({ _id: id })

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await AngkatanModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateAngkatanService = async ({ id, angkatan, isActive }: AngkatanBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await AngkatanModel.findOne({ _id: id })

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await AngkatanModel.updateOne(
        { _id: id },
        {
            $set:
            {
                angkatan,
                isActive
            }
        })
    return deleteAngkatan;
}