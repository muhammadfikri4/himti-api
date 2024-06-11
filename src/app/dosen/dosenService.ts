import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { DosenModel } from '../../config/model/dosen'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { REGEX } from '../../utils/Regex'
import { DosenBodyDTO } from './dosenDTO'
import { dosenMapper } from './dosenResponse'
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

export const getDosenService = async ({ name, page = 1, perPage = 10 }: SearchDosenTypes) => {

    if (name) {

        const dosens = await DosenModel.find({
            $where: function () {
                return this.name.includes(name)

            }
        }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as DosenModelTypes[]
        const totalData = dosens.length

        // Hitung total halaman
        const totalPages = Math.ceil(totalData / perPage);

        const result = dosenMapper(dosens)

        return { result, meta: { page, perPage, totalData, totalPages } }

    }
    const dosen = await DosenModel.find<DosenModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await DosenModel.find<DosenModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const result = dosenMapper(res)

    const response = { result, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteDosenService = async ({ id }: DosenBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchDosen = await DosenModel.findOne({ _id: id })

    if (!matchDosen) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await DosenModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateDosenService = async ({ id, name, isActive, email, mataKuliah, nidn, numberPhone }: DosenBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchDosen = await DosenModel.findOne({ _id: id })

    if (!matchDosen) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.DOSEN, 404, MESSAGE_CODE.NOT_FOUND)
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