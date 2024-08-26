import { prisma } from "../../config"
import { NotificationBodyRequest } from "./notificationDTO"

export const createNotification = async ({ body, title, acaraId, subAcaraId, userId }: NotificationBodyRequest) => {
    return await prisma.notificationHistory.create({
        data: {
            title,
            body,
            acaraId: acaraId ? acaraId : null,
            subAcaraId: subAcaraId ? subAcaraId : null,
            isRead: false,
            userId: userId as string
        },
        select: {
            id: true,
            title: true,
            body: true,
        }
    })
}

export const getNotifications = async (userId: string) => {
    return await prisma.notificationHistory.findMany({
        where: {
            userId,
        },
        include: {
            acara: {
                select: {
                    id: true,
                    name: true,
                }
            },
            subAcara: {
                select: {
                    id: true,
                    name: true,
                }
            },

        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getNotificationById = async (notificationId: string) => {
    return await prisma.notificationHistory.findUnique({
        where: {
            id: notificationId
        },
        select: {
            id: true,
            userId: true,
            isRead: true
        }
    })
}

export const updateStatusNotification = async (notificationId: string, status: boolean) => {
    return await prisma.notificationHistory.update({
        where: {
            id: notificationId
        },
        data: {
            isRead: status
        },
        select: {
            id: true,
            isRead: true
        }

    })
}