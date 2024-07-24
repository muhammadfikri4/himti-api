import { AnggotaModelTypes } from "./anggotaTypes";

export const anggotaMapper = async (anggotas: AnggotaModelTypes[]) => {
    const mapper = await Promise.all(anggotas.map(async (anggota: AnggotaModelTypes) => {
        const { id, createdAt, updatedAt, email, isActive, name, nim } = anggota

        return {
            id,
            nim: Number(nim),
            name: name,
            email: email,
            angkatan: {
                ...anggota.angkatan,
                year: Number(anggota.angkatan.year)
            },
            isActive: isActive,
            createdAt: createdAt,
            updatedAt: updatedAt

        }
    }))
    return mapper
}