import { Anggota, Angkatan } from "@prisma/client";

export interface AnggotaData extends Anggota {
    angkatan: Angkatan
}

export const anggotaMapper = (anggotas: AnggotaData[]) => {
    const mapper = anggotas.map((anggota: AnggotaData) => {
        const { id, createdAt, updatedAt, email, name, nim, facebook, instagram, linkedin, twitter, isActive } = anggota
        const sosmed = { facebook, instagram, linkedin, twitter }
        // const now = new Date().getFullYear()
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
    })
    return mapper
}