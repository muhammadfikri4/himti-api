import { prisma } from "config";
import { AcaraBodyDTO } from "./acaraDTO";
import { IFilterAcara } from "./acaraTypes";

export const createAcara = async ({ description, endTime, image, isOpen, name, startTime }: AcaraBodyDTO) => {
    return await prisma.acara.create({
        data: {
            name: name as string,
            description,
            endTime,
            isOpen,
            startTime,
            image: image as string
        }
    })
}


export const getAcara = async ({ page, perPage, name }: IFilterAcara) => {
    return await prisma.acara.findMany({
        where: {
            name: {
                contains: name,
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

export const getAcaraCount = async ({ name }: IFilterAcara) => {
    return await prisma.acara.count({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
    })
}

export const getAcaraById = async (id: string) => {
    return await prisma.acara.findUnique({
        where: {
            id
        }
    })
}

export const deleteAcara = async (id: string) => {
    return await prisma.acara.delete({
        where: {
            id
        }
    })
}

export const updateAcara = async (data: AcaraBodyDTO) => {
    return await prisma.acara.update({
        where: {
            id: data.id
        },
        data
    })
}