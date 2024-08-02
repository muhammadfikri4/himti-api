import { Prisma } from "@prisma/client"
import { prisma } from "../../config"
import { AnggotaBodyDTO, AnggotaSosmedDTO } from "./anggotaDTO"
import { IFilterAnggota } from "./anggotaTypes"

export const getAnggotaByAngkatanId = async (angkatanId: string) => {
    return await prisma.anggota.findFirst({
        where: {
            angkatanId
        }
    })
}

export const getAnggota = async ({ page, perPage, search, year }: IFilterAnggota, status?: boolean) => {
    const filter = {} as { OR: Prisma.AnggotaWhereInput[], angkatan: Prisma.AngkatanWhereInput }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },



        ]
    }

    if (year) {
        filter.angkatan = {
            year
        }
    }

    return await prisma.anggota.findMany({
        where: { ...filter, isActive: status },
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
            nim: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getAnggotaCount = async ({ search, year }: IFilterAnggota, status?: boolean) => {
    const filter = {} as { OR: Prisma.AnggotaWhereInput[], angkatan: Prisma.AngkatanWhereInput }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },



        ]
    }

    if (year) {
        filter.angkatan = {
            year
        }
    }
    return await prisma.anggota.count({
        where: { ...filter, isActive: status }
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
        data
    })
}

export const updateSosmedAnggota = async (data: AnggotaSosmedDTO) => {
    return await prisma.anggota.update({
        where: {
            id: data.id
        },
        data
    })
}