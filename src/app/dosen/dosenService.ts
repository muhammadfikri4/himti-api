import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { DosenModel } from '../../config/model/dosen'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { DosenBodyDTO } from './dosenDTO'
import { dosenMapper } from './dosenRequest'
import { DosenModelTypes, SearchDosenTypes } from './dosenTypes'

dotenv.config();

export const createDosenService = async ({ email, isActive, mataKuliah, name, nidn, numberPhone }: DosenBodyDTO) => {


    if (!REGEX.email.test(email as string)) {
        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIDN = await DosenModel.findOne({ nidn })
    if (matchNIDN) {
        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await DosenModel.findOne({ email })
    if (matchEmail) {
        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }


    const newDosen = await DosenModel.create({ name, email, isActive, mataKuliah, nidn, numberPhone })
    return newDosen

}

export const getDosenService = async ({ name }: SearchDosenTypes) => {

    if (name) {
        const dosens = await DosenModel.find() as DosenModelTypes[]
        const filtering = dosens?.filter((item) => {
            const lowerTitle = item.name?.toLowerCase()

            return lowerTitle?.includes(name?.toLowerCase())
        })
        const result = dosenMapper(filtering)

        return result

    }
    const dosen = await DosenModel.find<DosenModelTypes>()

    const result = dosenMapper(dosen)
    return result
}

export const deleteDosenService = async ({ id }: DosenBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await DosenModel.findOne({ _id: id })

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await DosenModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateDosenService = async ({ id, name, isActive, email, mataKuliah, nidn, numberPhone }: DosenBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchAngkatan = await DosenModel.findOne({ _id: id })

    if (!matchAngkatan) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await DosenModel.updateOne(
        { _id: id },
        {
            $set:
            {
                name,
                isActive,
                email,
                mataKuliah,
                nidn,
                numberPhone
            }
        })
    return deleteAngkatan;
}