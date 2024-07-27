import { prisma } from "config"
import { BusinessDTO } from "./businessDTO"

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