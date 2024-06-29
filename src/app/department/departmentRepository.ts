import { prisma } from "config";
import { DosenBodyDTO } from "./departmentDTO";
import { IFilterDosen } from "./departmentTypes";

export const createDosen = async ({ email, isActive, lesson, name, nidn, numberPhone }: DosenBodyDTO) => {
    return await prisma.dosen.create({
        data: {
            email,
            isActive,
            lesson,
            name: name as string,
            nidn: nidn as string,
            numberPhone
        }
    })

}

export const getDosen = async ({ page, perPage, email, name, nidn }: IFilterDosen) => {
    return await prisma.dosen.findMany({
        where: {
            email: {
                contains: email,
                mode: 'insensitive'
            },
            name: {
                contains: name,
                mode: 'insensitive'
            },
            nidn: {
                contains: nidn,
                mode: 'insensitive'
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getDosenCount = async ({ email, name, nidn }: IFilterDosen) => {
    return await prisma.dosen.count({
        where: {
            email: {
                contains: email,
                mode: 'insensitive'
            },
            name: {
                contains: name,
                mode: 'insensitive'
            },
            nidn: {
                contains: nidn?.toString(),
                mode: 'insensitive'
            }
        },
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