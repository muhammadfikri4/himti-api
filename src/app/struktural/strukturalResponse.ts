import { AngkatanModelTypes } from "app/angkatan/angkatanTypes";
import { AngkatanModel } from "../../config/model/angkatan";
import { StrukturalModelTypes } from "./strukturalTypes";

export const strukturalMapper = async (strukturals: StrukturalModelTypes[]): Promise<StrukturalModelTypes[]> => {
    const mapper = await Promise.all(strukturals.map(async (struktural) => {
        const angkatan = await AngkatanModel.findOne({ _id: struktural.angkatanId }) as unknown as AngkatanModelTypes

        return {
            id: struktural._id,
            nim: struktural.nim,
            name: struktural.name,
            email: struktural.email,
            jabatan: struktural.jabatan,
            angkatan: {
                id: angkatan?._id,
                angkatan: angkatan?.angkatan,
                isActive: angkatan?.isActive

            },
            imageUrl: struktural.imageUrl,
            isActive: struktural.isActive,
            createdAt: struktural.createdAt,
            updatedAt: struktural.updatedAt

        }
    }))
    return mapper
}