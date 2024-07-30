import { prisma } from "../../config";
import { AcaraBodyDTO, SubAcaraBodyDTO } from "./acaraDTO";
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

export const createSubAcara = async ({ description, endTime, image, isOpen, name, startTime, acaraId }: SubAcaraBodyDTO) => {
    return await prisma.subAcara.create({
        data: {
            name: name as string,
            description,
            endTime,
            isOpen,
            startTime,
            image: image as string,
            acaraId
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

export const getSubAcaraById = async (id: string) => {
    return await prisma.subAcara.findUnique({
        where: {
            id
        }
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

export const updateAcara = async (data: AcaraBodyDTO, id: string) => {
    return await prisma.acara.update({
        where: {
            id
        },
        data
    })
}

export const getSubAcaraByAcaraId = async (acaraId: string, isOpenAbsen?: boolean) => {
    return await prisma.subAcara.findMany({
        where: {
            acaraId,
            isOpenAbsen
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getSingleSubAcaraById = async (id: string) => {
    return await prisma.subAcara.findUnique({
        where: {
            id,
        }
    })
}