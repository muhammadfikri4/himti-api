import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { DosenBodyDTO } from "./dosenDTO";
import { IFilterDosen } from "./dosenTypes";

export const createDosen = async ({ email, isActive, lesson, name, nidn, numberPhone }: DosenBodyDTO) => {
    return await prisma.dosen.create({
        data: {
            email,
            isActive,
            lesson,
            name: name as string,
            nidn: nidn as string,
            numberPhone
        },
        select: {
            id: true,
            name: true,
        }
    })

}

export const getDosen = async ({ page, perPage, search }: IFilterDosen) => {
    const filter = {} as { OR: Prisma.DosenWhereInput[] }

    if (search) {
        filter.OR = [
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                nidn: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        ]
    }

    return await prisma.dosen.findMany({
        where: filter,
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            nidn: true,
            numberPhone: true,
            lesson: true,
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getDosenCount = async ({ search }: IFilterDosen) => {

    const filter = {} as { OR: Prisma.DosenWhereInput[] }

    if (search) {
        filter.OR = [
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                nidn: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        ]
    }

    return await prisma.dosen.count({
        where: filter
    })
}

export const deleteDosen = async (id: string) => {
    return await prisma.dosen.delete({
        where:
        {
            id
        }
    }
    )
}

export const getDosenById = async (id: string) => {
    return await prisma.dosen.findUnique({
        where: {
            id
        }
    })
}

export const getDosenByNIDN = async (nidn: string) => {
    return await prisma.dosen.findMany({
        where: {
            nidn
        }
    })
}
export const getDosenByEmail = async (email: string) => {
    return await prisma.dosen.findMany({
        where: {
            email
        }
    })
}

export const updateDosen = async (data: DosenBodyDTO) => {
    return await prisma.dosen.update({
        where: {
            id: data.id
        },
        data
    })
}