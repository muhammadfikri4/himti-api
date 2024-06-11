import dotenv from 'dotenv'
import { type Request } from 'express'
import mongoose from 'mongoose'
import { Meta } from 'utils/Meta'
import { AngkatanModel } from '../../config/model/angkatan'
import { StrukturalModel } from '../../config/model/struktural'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { StrukturalBodyDTO } from './strukturalDTO'
import { strukturalMapper } from './strukturalResponse'
import { SearchStrukturalTypes, StrukturalModelTypes } from './strukturalTypes'

dotenv.config();

export const createStrukturalService = async ({ name, nim, email, angkatanId, jabatan, isActive, facebook, instagram, linkedin, twitter }: StrukturalBodyDTO, req: Request) => {

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
    // const matchEmail = await StrukturalModel.findOne({ email })
    // if (matchEmail) {

    //     return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    // }

    if (!angkatanId) {

        return AppError(MESSAGES.ERROR.REQUIRED.ANGKATAN_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const matchAngkatan = await AngkatanModel.findOne({ _id: angkatanId })

    if (!matchAngkatan) {

        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.ID, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const image = req.file?.path.replace("src/assets/", "")
    console.log(image)
    const imageUrl = `${req.protocol}://${req.get("host")}/${image}`

    const newStruktural = await StrukturalModel.create({ name, email, isActive, nim, angkatanId, facebook, instagram, jabatan, linkedin, twitter, image, imageUrl })
    return newStruktural

}

export const getStrukturalService = async ({ name, page = 1, perPage = 10 }: SearchStrukturalTypes) => {

    if (name) {

        const dosens = await StrukturalModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
            .skip((page - 1) * perPage) as unknown as StrukturalModelTypes[]
        const totalData = dosens.length

        // Hitung total halaman
        const totalPages = Math.ceil(totalData / perPage);

        const result = await strukturalMapper(dosens)

        return { result, meta: { page, perPage, totalData, totalPages } }

    }
    const dosen = await StrukturalModel.find<StrukturalModelTypes>()

    const totalData = dosen.length

    // Batasi jumlah dokumen yang diambil pada satu halaman
    const res = await StrukturalModel.find<StrukturalModelTypes>()
        .limit(perPage)
        .skip((page - 1) * perPage);
    const result = await strukturalMapper(res)

    const response = { result, meta: Meta(page, perPage, totalData) }
    return response
}

export const deleteStrukturalService = async ({ id }: StrukturalBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const Struktural = await StrukturalModel.findOne({ _id: id })

    if (!Struktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const deleteAngkatan = await StrukturalModel.deleteOne({ _id: id })
    return deleteAngkatan;
}
export const updateStrukturalService = async ({ id, name, isActive, email, angkatanId, facebook, instagram, jabatan, linkedin, nim, twitter }: StrukturalBodyDTO) => {

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
        return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    const matchStruktural = await StrukturalModel.findOne({ _id: id })

    if (!matchStruktural) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const updateStruktural = await StrukturalModel.updateOne(
        { _id: id },
        {
            $set: {
                name,
                isActive,
                email,
                angkatanId,
                facebook,
                instagram,
                jabatan,
                linkedin,
                nim,
                twitter
            }

        })
    return updateStruktural;
}