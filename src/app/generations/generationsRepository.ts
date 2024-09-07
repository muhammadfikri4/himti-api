import { prisma } from "../../config";
import { IFilterGeneration } from "./generationsDTO";
import { GenerationBodyDTO } from "./generationsDTO";

export const createGeneration = async ({ year, isActive }: GenerationBodyDTO) => {
    return await prisma.generation.create({
        data: {
            year: year as string,
            isActive
        },
        select: {
            id: true
        }
    })
}

export const getGenerations = async ({ page, perPage, search }: IFilterGeneration) => {
    return await prisma.generation.findMany({
        where: {
            year: {
                contains: search,
            },
        },
        orderBy: {
            year: 'desc'
        },
        select: {
            id: true,
            year: true,
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getGenerationById = async (id: string) => {
    return await prisma.generation.findUnique({
        where: {
            id
        }
    })
}

export const getGenerationByYear = async (id: string) => {
    return await prisma.generation.findFirst({
        where: {
            id
        },
        orderBy: {
            year: 'desc'
        }
    })
}


export const getGenerationCount = async ({ search }: IFilterGeneration) => {
    return await prisma.generation.count({
        where: {
            year: {
                contains: search,
            },
            // isActive: status
        }
    })

}

export const updateGeneration = async (data: GenerationBodyDTO) => {
    return await prisma.generation.update({
        where: {
            id: data.id
        },
        data
    })
}

export const deleteGeneration = async (id: string) => {
    return await prisma.generation.delete({
        where: {
            id
        }
    })
}

export const getMatchGenerationExceptSameId = async (year: string) => {
    return await prisma.generation.findFirst({
        where: {
            year
        }
    })
}