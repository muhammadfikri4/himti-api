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
        }
    })
}

export const getNotifications = async (userId: string) => {
    return await prisma.notificationHistory.findMany({
        where: {
            userId
        },
        include: {
            acara: true,
            subAcara: true,

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
        }

    })
}