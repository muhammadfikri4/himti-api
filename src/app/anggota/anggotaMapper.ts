import { AnggotaModelTypes } from "./anggotaTypes";

export const anggotaMapper = async (anggotas: AnggotaModelTypes[]) => {
    const mapper = await Promise.all(anggotas.map(async (anggota: AnggotaModelTypes) => {
        const { id, createdAt, updatedAt, email, isActive, name, nim, facebook, instagram, linkedin, twitter } = anggota
        const sosmed = { facebook, instagram, linkedin, twitter }

        return {
            id,
            nim,
            name,
            email,
            angkatan: {
                id: anggota.angkatan.id,
                year: anggota.angkatan.year
            },
            ...sosmed,
            isActive,
            createdAt,
            updatedAt

        }
    }))
    return mapper
}