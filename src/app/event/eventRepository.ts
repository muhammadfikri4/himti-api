import { prisma } from "../../config";
import { Query } from "../../interface/Query";
import { CreateEventBodyRequest, EventBodyDTO } from "./eventDTO";
import { openValue } from "./eventService";

export const createEvent = async ({ description, endTime, image, isOpen, name, startTime }: CreateEventBodyRequest) => {
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



export const getEvents = async (query: Query) => {
    const { isOpen, page = '1', perPage = '10', search } = query
    return await prisma.event.findMany({
        where: {
            name: {
                contains: search,
            },
            isOpen: openValue(isOpen as string),
            deletedAt: null
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
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getEventCount = async (query: Query) => {
    const {search,isOpen} = query
    return await prisma.event.count({
        where: {
            name: {
                contains: search,
            },
            isOpen: openValue(isOpen),
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

export const deleteEvent = async (id: string) => {
    return await prisma.event.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    })
}

export const sofDeleteEvent = async (id: string) => {
    return await prisma.event.update({
        where: {
            id
        },
        data: {
            isOpen: false,
            deletedAt: new Date()
        },
        select: {
            id: true
        }
    })
}

export const updateEvent = async (data: EventBodyDTO, id: string) => {
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