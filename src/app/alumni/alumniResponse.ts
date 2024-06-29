// import { ObjectId } from "mongoose";
// import { AnggotaModel } from "../../config/model/anggota";
// import { AngkatanModel } from "../../config/model/angkatan";
// import { AnggotaModelTypes } from "../anggota/anggotaTypes";
// import { AngkatanModelTypes } from "../angkatan/angkatanTypes";
// import { AlumniModelTypes, IAlumniResponse } from "./alumniTypes";

// export const alumniMapper = async (alumnis: AlumniModelTypes[]): Promise<IAlumniResponse[]> => {
//     const mapper = await Promise.all(alumnis.map(async (alumni) => {
//         const { _id, createdAt, updatedAt, anggotaId, company, image, isActive } = alumni
//         const anggota = await AnggotaModel.findOne({ _id: anggotaId }) as unknown as AnggotaModelTypes
//         const angkatan = await AngkatanModel.findOne({ _id: anggota.angkatanId }) as unknown as AngkatanModelTypes

//         return {
//             id: _id,
//             anggota: {
//                 id: anggota?._id,
//                 name: anggota?.name as string,
//                 nim: anggota?.nim as number,
//                 isActive: anggota?.isActive as boolean,
//                 angkatan: {
//                     id: angkatan?._id as ObjectId,
//                     angkatan: angkatan?.angkatan as number,
//                     isActive: angkatan?.isActive as boolean

//                 },
//             },
//             company: company,
//             image: image,
//             isActive: isActive,
//             createdAt: createdAt,
//             updatedAt: updatedAt

//         }
//     }))
//     return mapper
// }