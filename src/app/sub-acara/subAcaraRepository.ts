import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { SubAcaraBodyDTO } from "./subAcaraDTO";
import { IFilterSubAcara } from "./subAcaraTypes";

export const createSubAcara = async ({ description, endTime, image, isOpen, name, startTime, acaraId }: SubAcaraBodyDTO) => {
    return await prisma.subAcara.create({
        data: {
            name: name as string,
            description,
            endTime,
            isOpen,
            startTime,
            image: image as string,
            acaraId: acaraId as string
        }
    })
}

export const getSubAcara = async ({ page, perPage, search, acaraId }: IFilterSubAcara) => {

    const filter = {} as Prisma.SubAcaraWhereInput

    if (search) {
        {
            filter.OR = [...(filter.OR as Prisma.SubAcaraWhereInput[]), {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }]
        }
    }

    if (acaraId) {
        filter.OR = [...(filter.OR as Prisma.SubAcaraWhereInput[]), {
            acaraId
        }]
    }

    return await prisma.subAcara.findMany({
        where: filter,
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getSubAcaraCount = async ({ search, acaraId }: IFilterSubAcara) => {
    const filter = {} as Prisma.SubAcaraWhereInput

    if (search) {
        {
            filter.OR = [...(filter.OR as Prisma.SubAcaraWhereInput[]), {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            }]
        }
    }

    if (acaraId) {
        filter.OR = [...(filter.OR as Prisma.SubAcaraWhereInput[]), {
            acaraId
        }]
    }
    return await prisma.subAcara.count({
        where: filter
    })
}

export const getSubAcaraById = async (id: string) => {
    return await prisma.subAcara.findUnique({
        where: {
            id
        }
    })
}

export const deleteSubAcara = async (id: string) => {
    return await prisma.subAcara.delete({
        where: {
            id
        }
    })
}

export const updateSubAcara = async (data: SubAcaraBodyDTO, id: string) => {
    return await prisma.acara.update({
        where: {
            id
        },
        data
    })
}
