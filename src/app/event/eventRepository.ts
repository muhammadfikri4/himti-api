import { prisma } from "../../config";
import { CreateEventBodyRequest, EventBodyDTO } from "./eventDTO";
import { IFilterEvent } from "./eventTypes";

export const createEvent = async ({ description, endTime, image,isOpen , name, startTime }: CreateEventBodyRequest) => {
    return await prisma.event.create({
        data: {
            name: name as string,
            description,
            endTime,
            isOpen,
            startTime,
            image: image as string
        },
        select: {
            id: true
        }
    })
}



export const getEvents = async ({ page, perPage, search, openRegister }: IFilterEvent) => {
    return await prisma.event.findMany({
        where: {
            name: {
                contains: search,
            },
            isOpen: openRegister as boolean,
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            startTime: true,
            endTime: true,
            isOpen: true,
            image: true,
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getEventCount = async ({ search, openRegister }: IFilterEvent) => {
    return await prisma.event.count({
        where: {
            name: {
                contains: search,
            },
            isOpen: openRegister as boolean,
        },
    })
}

export const getEventById = async (id: string) => {
    return await prisma.event.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            image: true,
            startTime: true,
            endTime: true,
            description: true,
        }
    })
}

export const deleteAcara = async (id: string) => {
    return await prisma.event.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}

export const updateAcara = async (data: EventBodyDTO, id: string) => {
    return await prisma.event.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            name: true,
            description: true
        }
    })
}