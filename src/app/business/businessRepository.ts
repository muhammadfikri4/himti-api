import { prisma } from "../../config"
import { BusinessDTO, IFilterBusiness } from "./businessDTO"

export const createMerchandise = async (data: BusinessDTO) => {
    return await prisma.bussiness.create({
        data: {
            ...data,
            type: 'MERCHANDISE',
            image: data.image?.path as string,
        }
    })
}
export const createService = async (data: BusinessDTO) => {
    return await prisma.bussiness.create({
        data: {
            ...data,
            type: 'SERVICE',
            image: data.image?.path as string,
        }
    })
}

export const getMerchandiseByTitle = async (title: string) => {
    return await prisma.bussiness.findFirst({
        where: {
            type: 'MERCHANDISE',
            title
        }
    })
}

export const getServiceByTitle = async (title: string) => {
    return await prisma.bussiness.findFirst({
        where: {
            type: 'MERCHANDISE',
            title
        }
    })
}

export const getMerchandises = async ({ page, perPage, search, }: IFilterBusiness) => {
    return await prisma.bussiness.findMany({
        where: {
            type: 'MERCHANDISE',
            title: {
                contains: search,
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })
}
export const getMerchandisesCount = async ({ search, }: IFilterBusiness) => {
    return await prisma.bussiness.count({
        where: {
            type: 'MERCHANDISE',
            title: {
                contains: search,
            }
        }
    })
}
export const getServices = async ({ page, perPage, search, }: IFilterBusiness) => {
    return await prisma.bussiness.findMany({
        where: {
            type: 'SERVICE',
            title: {
                contains: search,
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })
}
export const getServicesCount = async ({ search }: IFilterBusiness) => {
    return await prisma.bussiness.count({
        where: {
            type: 'SERVICE',
            title: {
                contains: search,
            }
        }
    })
}
