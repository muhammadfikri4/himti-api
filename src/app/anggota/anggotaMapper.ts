import { Anggota, Angkatan } from "@prisma/client";

export interface AnggotaData extends Anggota {
    angkatan: Angkatan
}

interface DataRedis {
    [x: string]: AnggotaData
}

export const anggotaMapper = (anggotas: AnggotaData[]) => {
    const mapper = anggotas.map((anggota: AnggotaData) => {
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
            isActive: Number(anggota.angkatan.year) <= now - 5 ? false : true,
            createdAt,
            updatedAt

        }
    })
    return mapper
}

export const anggotaDTOMapperFromRedis = (data: DataRedis[]) => {
    return data.flatMap(obj => Object.values(obj))
}