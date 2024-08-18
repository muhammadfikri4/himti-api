import { AnggotaModelTypes } from "./anggotaTypes";

export const anggotaMapper = async (anggotas: AnggotaModelTypes[]) => {
    const mapper = await Promise.all(anggotas.map(async (anggota: AnggotaModelTypes) => {
        const { id, createdAt, updatedAt, email, name, nim, facebook, instagram, linkedin, twitter } = anggota
        const sosmed = { facebook, instagram, linkedin, twitter }
        const now = new Date().getFullYear()
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
            isActive: Number(anggota.angkatan.year) <= now - 5 ? true : false,
            createdAt,
            updatedAt

        }
    }))
    return mapper
}