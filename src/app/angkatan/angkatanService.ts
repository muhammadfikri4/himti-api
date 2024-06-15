import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { AnggotaModel } from '../../config/model/anggota'
import { AngkatanModel } from '../../config/model/angkatan'
import { Result } from '../../utils/ApiResponse'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
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

export const getAngkatanService = async ({ search, page = 1, perPage = 10, }: SearchAngkatanTypes): Promise<Result<AngkatanModelTypes[]>> => {

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
        ]).sort({ angkatan: 1 }).limit(perPage)
            .skip((page - 1) * perPage);

        const totalData = await AngkatanModel.countDocuments()
        const data = angkatanMapper(angkatan)
        return { data, meta: Meta(page, perPage, totalData) }

    }

    const angkatan = await AngkatanModel.find<AngkatanModelTypes>().limit(perPage)
        .skip((page - 1) * perPage).sort({ angkatan: 1 })

    const totalData = await AngkatanModel.countDocuments()
    const data = angkatanMapper(angkatan)
    return { data, meta: Meta(page, perPage, totalData) }
}

export const deleteAngkatanService = async ({ id }: AngkatanBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await AngkatanModel.findOne({ _id: id })

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const isUsed = await AnggotaModel.findOne({ angkatanId: id })
    if (isUsed) {
        return AppError(MESSAGES.ERROR.RELATION.ANGKATAN, 400, MESSAGE_CODE.BAD_REQUEST)
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