import { Jabatan } from "@prisma/client"
import { prisma } from "../../config"
import { StrukturalBodyDTO } from "./strukturalDTO"
import { IFilterStruktural } from "./strukturalTypes"

export const getStrukturalById = async (id: string) => {
    return await prisma.struktural.findUnique({
        where: {
            id
        }
    })
}

export const deleteStruktural = async (id: string) => {
    return await prisma.struktural.delete({
        where: {
            id
        }
    })
}

export const createStruktural = async (data: StrukturalBodyDTO) => {
    const { anggotaId, image, isActive, jabatan } = data

    return await prisma.struktural.create({
        data: {
            image: image as string,
            jabatan: jabatan as Jabatan,
            anggotaId: anggotaId as string,
            isActive
        }
    })
}

export const getStruktural = async ({ search, page, perPage }: IFilterStruktural) => {
    return await prisma.struktural.findMany({
        where: {
            jabatan: search as Jabatan,
        },
        include: {
            anggota: {
                select: {
                    id: true,
                    name: true,
                    nim: true,
                    facebook: true,
                    instagram: true,
                    linkedin: true,
                    twitter: true,
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getStrukturalCount = async ({ search, page, perPage }: IFilterStruktural) => {
    return await prisma.struktural.count({
        where: {
            jabatan: search as Jabatan,
        },
    })
}

export const updateStruktural = async (data: StrukturalBodyDTO) => {
    return await prisma.struktural.update({
        where: {
            id: data.id as string
        },
        data
    })
}

export const getStrukturalByAnggotaId = async (anggotaId: string) => {
    return await prisma.struktural.findFirst({
        where: {
            anggotaId
        }
    })
}

export const getStrukturalByJabatan = async (jabatan: Jabatan) => {
    return await prisma.struktural.findFirst({
        where: {
            jabatan
        }
    })
}