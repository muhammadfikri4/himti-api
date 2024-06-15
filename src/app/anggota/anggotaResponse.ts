import { ObjectId } from "mongoose";
import { AngkatanModel } from "../../config/model/angkatan";
import { AngkatanModelTypes } from "../angkatan/angkatanTypes";
import { AnggotaModelTypes, IAnggotaResponse } from "./anggotaTypes";

export const strukturalMapper = async (anggotas: AnggotaModelTypes[]): Promise<IAnggotaResponse[]> => {
    const mapper = await Promise.all(anggotas.map(async (anggota) => {
        const { _id, createdAt, updatedAt, angkatanId, email, isActive, name, nim } = anggota
        const angkatan = await AngkatanModel.findOne({ _id: angkatanId }) as unknown as AngkatanModelTypes

        return {
            id: _id,
            nim: nim,
            name: name,
            email: email,
            angkatan: {
                id: angkatan?._id as ObjectId,
                angkatan: angkatan?.angkatan as number,
                isActive: angkatan?.isActive as boolean

            },
            isActive: isActive,
            createdAt: createdAt,
            updatedAt: updatedAt

        }
    }))
    return mapper
}