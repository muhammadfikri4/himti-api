// import dotenv from 'dotenv'
// import { type Request } from 'express'
// import mongoose from 'mongoose'
// import { Result } from '../../utils/ApiResponse'
// import { MESSAGE_CODE } from '../../utils/ErrorCode'
// import { AppError, HttpError } from '../../utils/HttpError'
// import { MESSAGES } from '../../utils/Messages'
// import { Meta } from '../../utils/Meta'
// import { StrukturalBodyDTO } from './strukturalDTO'
// import { strukturalMapper } from './strukturalResponse'
// import { IStrukturalResponse, SearchStrukturalTypes, StrukturalModelTypes } from './strukturalTypes'
// import { strukturalValidate } from './strukturalValidate'

// dotenv.config();

// export const createStrukturalService = async ({ anggotaId, jabatan, isActive, facebook, instagram, linkedin, twitter }: StrukturalBodyDTO, req: Request) => {

//     const validate = await strukturalValidate({ anggotaId, image: req.file?.path, jabatan })
//     if ((validate as HttpError)?.message) {
//         return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
//     }

//     const { path } = req.file as Express.Multer.File

//     const newStruktural = await StrukturalModel.create({ isActive, anggotaId, facebook: facebook || null, instagram, jabatan, linkedin: linkedin || null, twitter: twitter || null, image: path })
//     return newStruktural
// }

// export const getStrukturalService = async ({ name, page = 1, perPage = 10 }: SearchStrukturalTypes): Promise<Result<IStrukturalResponse[]>> => {

//     if (name) {

//         const strukturals = await StrukturalModel.find({ name: new RegExp(name, 'i') }).limit(perPage)
//             .skip((page - 1) * perPage) as unknown as StrukturalModelTypes[]
//         const totalData = strukturals.length

//         const data = await strukturalMapper(strukturals)

//         return { data, meta: Meta(page, perPage, totalData) }

//     }
//     const dosen = await StrukturalModel.find<StrukturalModelTypes>()

//     const totalData = dosen.length

//     // Batasi jumlah dokumen yang diambil pada satu halaman
//     const res = await StrukturalModel.find<StrukturalModelTypes>()
//         .limit(perPage)
//         .skip((page - 1) * perPage);
//     const data = await strukturalMapper(res)

//     const response = { data, meta: Meta(page, perPage, totalData) }
//     return response
// }

// export const deleteStrukturalService = async ({ id }: StrukturalBodyDTO) => {

//     if (!mongoose.Types.ObjectId.isValid(id as string)) {
//         return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
//     }
//     const Struktural = await StrukturalModel.findOne({ _id: id })

//     if (!Struktural) {
//         return AppError(MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, 404, MESSAGE_CODE.NOT_FOUND)
//     }

//     const deleteAngkatan = await StrukturalModel.deleteOne({ _id: id })
//     return deleteAngkatan;
// }
// export const updateStrukturalService = async ({ id, isActive, facebook, instagram, jabatan, linkedin, twitter, image, anggotaId }: StrukturalBodyDTO) => {

//     if (!mongoose.Types.ObjectId.isValid(id as string)) {
//         return AppError(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
//     }
//     const matchStruktural = await StrukturalModel.findOne({ _id: id })

//     if (!matchStruktural) {
//         return AppError(MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, 404, MESSAGE_CODE.NOT_FOUND)
//     }
//     const updateFields: Partial<StrukturalBodyDTO> = {};

//     if (isActive !== undefined) updateFields.isActive = isActive;
//     if (anggotaId !== undefined) updateFields.anggotaId = anggotaId;
//     if (facebook !== undefined) updateFields.facebook = facebook;
//     if (instagram !== undefined) updateFields.instagram = instagram;
//     if (jabatan !== undefined) updateFields.jabatan = jabatan;
//     if (linkedin !== undefined) updateFields.linkedin = linkedin;
//     if (twitter !== undefined) updateFields.twitter = twitter;
//     if (image !== undefined) updateFields.image = image;

//     const updateStruktural = await StrukturalModel.updateOne(
//         { _id: id },
//         {
//             $set: updateFields

//         })

//     return updateStruktural;
// }
