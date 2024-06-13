import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { DosenModel } from '../../config/model/dosen'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { DosenBodyDTO } from './dosenDTO'
import { dosenMapper } from './dosenResponse'
import { DosenModelTypes, SearchDosenTypes } from './dosenTypes'
import { dosenValidate } from './dosenValidate'

dotenv.config();

export const createDosenService = async ({ email, isActive, mataKuliah, name, nidn, numberPhone }: DosenBodyDTO) => {

    const validate = await dosenValidate({ email, name, nidn })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const newDosen = await DosenModel.create({ name, email, isActive, mataKuliah: mataKuliah || null, nidn, numberPhone })
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

        const result = dosenMapper(dosens)

        return { result, meta: Meta(page, perPage, totalData) }

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

    const updateFields: Partial<DosenBodyDTO> = {};

    if (name !== undefined) updateFields.name = name;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (email !== undefined) updateFields.email = email;
    if (mataKuliah !== undefined) updateFields.mataKuliah = mataKuliah;
    if (nidn !== undefined) updateFields.nidn = nidn;
    if (numberPhone !== undefined) updateFields.numberPhone = numberPhone;

    const updateDosen = await DosenModel.updateOne(
        { _id: id },
        {
            $set: updateFields
        })
    return updateDosen;
}