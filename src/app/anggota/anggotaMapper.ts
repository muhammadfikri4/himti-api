import { AnggotaModelTypes } from "./anggotaTypes";

export const anggotaMapper = (anggotas: AnggotaModelTypes[]) => {
    const mapper = anggotas.map((anggota: AnggotaModelTypes) => {
        const { id, createdAt, updatedAt, email, name, nim, facebook, instagram, linkedin, twitter } = anggota
        const sosmed = { facebook, instagram, linkedin, twitter }
        const now = new Date().getFullYear()
        return {
            // redisId: "",
            id,
            nim,
            name,
            email,
            angkatan: {
                id: anggota.angkatan.id,
                year: anggota.angkatan.year
            },
            ...sosmed,
            isActive: Number(anggota.angkatan.year) <= now - 5 ? false : true,

        }
    })
    return mapper
}