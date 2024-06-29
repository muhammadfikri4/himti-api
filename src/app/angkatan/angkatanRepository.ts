import { prisma } from "../../config";
import { AngkatanBodyDTO } from "./angkatanDTO";
import { IFilterAngkatan } from "./angkatanTypes";

export const createAngkatan = async ({ year, isActive }: AngkatanBodyDTO) => {
    return await prisma.angkatan.create({
        data: {
            year: year as string,
            isActive
        }
    })
}

export const getAngkatan = async ({ page, perPage, search }: IFilterAngkatan) => {
    return await prisma.angkatan.findMany({
        where: {
            year: {
                contains: search
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getAngkatanById = async (id: string) => {
    return await prisma.angkatan.findUnique({
        where: {
            id
        }
    })
}

export const getAngkatanByYear = async (id: string) => {
    return await prisma.angkatan.findFirst({
        where: {
            id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}


export const getProductsCount = async ({ search }: IFilterAngkatan) => {
    return await prisma.angkatan.count({
        where: {
            year: {
                contains: search
            }
        }
    })

}

export const updateAngkatan = async (data: AngkatanBodyDTO) => {
    return await prisma.angkatan.update({
        where: {
            id: data.id
        },
        data
    })
}

export const deleteAngkatanRepository = async (id: string) => {
    return await prisma.angkatan.delete({
        where: {
            id
        }
    })
}