import { ObjectId } from "mongoose";
import { AnggotaModelTypes } from "../../app/anggota/anggotaTypes";
import { AngkatanModelTypes } from "../../app/angkatan/angkatanTypes";
import { AnggotaModel } from "../../config/model/anggota";
import { AngkatanModel } from "../../config/model/angkatan";
import { IStrukturalResponse, StrukturalModelTypes } from "./strukturalTypes";

export const strukturalMapper = async (strukturals: StrukturalModelTypes[]): Promise<IStrukturalResponse[]> => {
    const mapper = await Promise.all(strukturals.map(async (struktural) => {
        const anggota = await AnggotaModel.findOne({ _id: struktural.anggotaId }) as unknown as AnggotaModelTypes
        const angkatan = await AngkatanModel.findOne({ _id: anggota.angkatanId }) as unknown as AngkatanModelTypes
        const { _id, image, jabatan, isActive, createdAt, updatedAt, facebook, instagram, linkedin, twitter } = struktural
        return {
            id: _id,
            anggota: {
                id: anggota._id,
                name: anggota.name as string,
                nim: anggota.nim as number,
                isActive: anggota.isActive as boolean,
                angkatan: {
                    id: angkatan?._id as ObjectId,
                    angkatan: angkatan.angkatan as number,
                }
            },
            jabatan,
            image,
            instagram,
            facebook,
            twitter,
            linkedin,
            isActive,
            createdAt,
            updatedAt

        }
    }))
    return mapper
}