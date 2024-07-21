import { prisma } from "../../config"
import { AnggotaBodyDTO } from "./anggotaDTO"
import { IFilterAnggota } from "./anggotaTypes"

export const getAnggotaByAngkatanId = async (angkatanId: string) => {
    return await prisma.anggota.findFirst({
        where: {
            angkatanId
        }
    })
}

export const getAnggota = async ({ page, perPage, email, name, nim }: IFilterAnggota) => {
    return await prisma.anggota.findMany({
        where: {
            email: {
                contains: email,
                mode: 'insensitive'
            },
            name: {
                contains: name,
                mode: 'insensitive'
            },
            nim: {
                contains: nim?.toString(),
                mode: 'insensitive'
            }
        },
        include: {
            angkatan: {
                select: {
                    id: true,
                    year: true,
                    isActive: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getAnggotaCount = async ({ email, name, nim }: IFilterAnggota) => {
    return await prisma.anggota.count({
        where: {
            email: {
                contains: email,
                mode: 'insensitive'
            },
            name: {
                contains: name,
                mode: 'insensitive'
            },
            nim: {
                contains: nim?.toString(),
                mode: 'insensitive'
            }
        },
    })
}

export const getAnggotaByNIM = async (nim: string) => {
    return await prisma.anggota.findUnique({
        where: {
            nim
        }
    })
}

export const getAnggotaById = async (id: string) => {
    return await prisma.anggota.findUnique({
        where: {
            id
        }
    })
}

export const getAnggotaByEmail = async (email: string) => {
    return await prisma.anggota.findFirst({
        where: {
            email
        }
    })
}

export const createAnggota = async ({ angkatanId, email, isActive, name, nim }: AnggotaBodyDTO) => {
    return await prisma.anggota.create({
        data: {
            name: name as string,
            nim: nim?.toString() as string,
            angkatanId: angkatanId as string,
            email: email || null,
            isActive
        }
    })
}

export const deleteAnggota = async (id: string) => {
    return await prisma.anggota.delete({
        where: {
            id
        }
    })
}

export const updateAnggota = async (data: AnggotaBodyDTO) => {
    return await prisma.anggota.update({
        where: {
            id: data.id
        },
        data: data.nim ? {
            ...data,
            nim: data.nim.toString()
        } : {
            ...data
        }
    })
}
