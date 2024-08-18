import { prisma } from "../../config"
import { NotificationBodyRequest } from "./notificationDTO"

export const createNotification = async ({ body, title, acaraId, subAcaraId, userId }: NotificationBodyRequest) => {
    return await prisma.notificationHistory.create({
        data: {
            title,
            body,
            acaraId,
            subAcaraId,
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
            subAcara: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}