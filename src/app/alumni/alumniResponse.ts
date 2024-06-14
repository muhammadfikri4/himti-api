import { ObjectId } from "mongoose";
import { AnggotaModel } from "../../config/model/anggota";
import { AngkatanModel } from "../../config/model/angkatan";
import { AnggotaModelTypes } from "../anggota/anggotaTypes";
import { AngkatanModelTypes } from "../angkatan/angkatanTypes";
import { AlumniModelTypes } from "./alumniTypes";

export const alumniMapper = async (alumnis: AlumniModelTypes[]): Promise<AlumniModelTypes[]> => {
    const mapper = await Promise.all(alumnis.map(async (alumni) => {
        const { _id, createdAt, updatedAt, anggotaId, angkatanId, company, image, imageUrl, isActive } = alumni
        const angkatan = await AngkatanModel.findOne({ _id: angkatanId }) as unknown as AngkatanModelTypes
        const anggota = await AnggotaModel.findOne({ _id: anggotaId }) as unknown as AnggotaModelTypes

        return {
            id: _id,
            anggota: {
                id: anggota?._id as ObjectId,
                name: anggota?.name as string,
                nim: anggota?.nim as number,
                isActive: anggota?.isActive as boolean,
                angkatan: {
                    id: angkatan?._id as ObjectId,
                    angkatan: angkatan?.angkatan as number,
                    isActive: angkatan?.isActive as boolean

                },
            },
            imageUrl: imageUrl as string,
            isActive: isActive as boolean,
            createdAt: createdAt as Date,
            updatedAt: updatedAt as Date

        }
    }))
    return mapper
}