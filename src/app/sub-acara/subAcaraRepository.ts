import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { SubAcaraBodyDTO } from "./subAcaraDTO";
import { IFilterSubAcara } from "./subAcaraTypes";

export const createSubAcara = async ({ description, endTime, image, name, startTime, acaraId }: SubAcaraBodyDTO) => {
    return await prisma.subAcara.create({
        data: {
            name: name as string,
            description,
            endTime,
            startTime,
            image: image as string,
            acaraId: acaraId as string
        }
    })
}

export const getSubAcara = async ({ page, perPage, search, acaraId }: IFilterSubAcara) => {

    const filter = { OR: [], AND: {} } as { OR: Prisma.SubAcaraWhereInput[], AND: Prisma.SubAcaraWhereInput }

    if (search) {

        filter.OR.push({
            name: {
                contains: search,
                mode: 'insensitive'
            }
        })
    }

    if (acaraId) {
        if (search) {
            filter.AND = {
                acaraId
            }
        } else {
            filter.OR.push({
                acaraId
            })
        }
    }

    return await prisma.subAcara.findMany({
        where: (search || acaraId) ? filter : undefined,
        include: {
            acara: {
                select: {
                    id: true,
                    name: true,
                    isOpen: true,
                    isOpenAbsen: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getSubAcaraCount = async ({ search, acaraId }: IFilterSubAcara) => {
    const filter = { OR: [], AND: {} } as { OR: Prisma.SubAcaraWhereInput[], AND: Prisma.SubAcaraWhereInput }

    if (search) {

        filter.OR.push({
            name: {
                contains: search,
                mode: 'insensitive'
            }
        })
    }

    if (acaraId) {
        if (search) {
            filter.AND = {
                acaraId
            }
        } else {
            filter.OR.push({
                acaraId
            })
        }
    }

    return await prisma.subAcara.count({
        where: (search || acaraId) ? filter : undefined
    })
}

export const getSubAcaraById = async (id: string) => {
    return await prisma.subAcara.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            image: true,
            startTime: true,
            endTime: true,
            description: true
        }
    })
}

export const deleteSubAcara = async (id: string) => {
    return await prisma.subAcara.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}

export const updateSubAcara = async (data: SubAcaraBodyDTO, id: string) => {
    return await prisma.subAcara.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            name: true,
        }
    })
}
