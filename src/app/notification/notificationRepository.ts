import { prisma } from "../../config"

export const createNotification = async (title: string, body: string, acaraId?: string, subAcaraId?: string) => {
    return await prisma.notificationHistory.create({
        data: {
            title,
            body,
            acaraId,
            subAcaraId,
            isRead: false
        }
    })
}

export const getNotifications = async () => {
    return await prisma.notificationHistory.findMany({
        include: {
            acara: true,
            subAcara: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}