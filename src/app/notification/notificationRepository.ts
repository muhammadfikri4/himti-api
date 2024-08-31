// import { prisma } from "../../config"
// import { NotificationBodyRequest } from "./notificationDTO"

// export const createNotification = async ({ body, title, acaraId, eventMeetingId, userId }: NotificationBodyRequest) => {
//     return await prisma.notificationHistory.create({
//         data: {
//             title,
//             body,
//             acaraId: acaraId ? acaraId : null,
//             isRead: false,
//             eventMeetingId: eventMeetingId ? eventMeetingId : null,
//             userId: userId as string
//         },
//         select: {
//             id: true,
//             title: true,
//             body: true,
//         }
//     })
// }

// export const getNotifications = async (userId: string) => {
//     return await prisma.notificationHistory.findMany({
//         where: {
//             userId,
//         },
//         include: {
//             Event: {
//                 select: {
//                     id: true,
//                     name: true,
//                 }
//             },
//             EventMeeting: true

//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     })
// }

// export const getNotificationById = async (notificationId: string) => {
//     return await prisma.notificationHistory.findUnique({
//         where: {
//             id: notificationId
//         },
//         select: {
//             id: true,
//             userId: true,
//             isRead: true
//         }
//     })
// }

// export const updateStatusNotification = async (notificationId: string, status: boolean) => {
//     return await prisma.notificationHistory.update({
//         where: {
//             id: notificationId
//         },
//         data: {
//             isRead: status
//         },
//         select: {
//             id: true,
//             isRead: true
//         }

//     })
// }