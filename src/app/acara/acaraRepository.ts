import { prisma } from "../../config";
import { AcaraBodyDTO, SubAcaraBodyDTO } from "./acaraDTO";
import { IFilterAcara } from "./acaraTypes";

export const createAcara = async ({ description, endTime, image, isOpenAbsen, isOpenRegister, name, startTime }: AcaraBodyDTO) => {
    return await prisma.acara.create({
        data: {
            name: name as string,
            description,
            endTime,
            isOpen: isOpenRegister,
            isOpenAbsen,
            startTime,
            image: image as string
        }
    })
}

export const createSubAcara = async ({ description, endTime, image, name, startTime, acaraId }: SubAcaraBodyDTO) => {
    return await prisma.subAcara.create({
        data: {
            name: name as string,
            description,
            endTime,
            startTime,
            image: image as string,
            acaraId
        }
    })
}



export const getAcara = async ({ page, perPage, search, openAbsen, openRegister }: IFilterAcara) => {
    return await prisma.acara.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            },
            isOpen: openRegister as boolean,
            isOpenAbsen: openAbsen as boolean
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getAcaraCount = async ({ search, openAbsen, openRegister }: IFilterAcara) => {
    return await prisma.acara.count({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            },
            isOpen: openRegister as boolean,
            isOpenAbsen: openAbsen as boolean
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

export const getSubAcaraByAcaraId = async (acaraId: string) => {
    return await prisma.subAcara.findMany({
        where: {
            acaraId,
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

export const getAllSubAcaraById = async (id: string) => {
    return await prisma.subAcara.findMany({
        where: {
            id
        }
    })
}