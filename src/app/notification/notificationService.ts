import { Role } from "@prisma/client"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { firebase } from "../../utils/FirebaseConfig"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getSubAcaraById } from "../acara/acaraRepository"
import { getUserById } from "../authentication/authRepository"
import { getAllFCMUser } from "../user-fcm/user-fcm.repository"
import { NotificationData, getNotificationDTOMapper } from "./notificationMapper"
import { createNotification, getNotificationById, getNotifications, updateStatusNotification } from "./notificationRepository"

export const sendNotificationService = async (
    title: string = 'testing title notification',
    body: string = 'testing body notification',
    acaraId?: string,
    subAcaraId?: string
) => {

    const fcm = await getAllFCMUser()
    let idAcara = acaraId

    if (!fcm.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.FCM_USER, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (subAcaraId) {
        const sub = await getSubAcaraById(subAcaraId)
        if (!sub) {
            return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SUB_ACARA, 404, MESSAGE_CODE.NOT_FOUND)
        }

        idAcara = sub.acaraId
    }

    try {

        const result = await Promise.all(fcm.map(async (item) => {

            const message = {
                notification: {
                    title,
                    body,
                },
                android: {
                    notification: {
                        sound: "default",
                    },
                    data: {
                        title,
                        body,
                    },
                },
                token: item.fcmToken as string,
            };
            const user = await getUserById(item.userId)
            if (user?.role === 'USER' && subAcaraId) {
                return
            }
            await firebase.messaging().send(message);
            await createNotification({
                body,
                title,
                acaraId: acaraId ? acaraId : undefined,
                subAcaraId: subAcaraId ? subAcaraId : undefined,
                userId: item.userId
            })

        }))


        console.log("Successfully sent message:");
        return result
    } catch (error: any) {
        // if (error.message.toLowerCase() === "auth error from apns or web push service") {

        //     const result = await createNotification(title, body, idAcara, subAcaraId)
        //     return result
        // }
        console.error("Error sending message:", error.message);
        if (error instanceof ErrorApp) {
            return new ErrorApp(error.message, error.statusCode, error.code)
        }
        throw error
        // throw error;
    }
}

export const sendSingleNotificationService = async (
    title: string = 'testing title notification',
    body: string = 'testing body notification',
    token?: string
) => {
    try {
        if (!token || typeof token !== 'string') {
            return new ErrorApp(MESSAGES.ERROR.REQUIRED.FCM_TOKEN, 400, MESSAGE_CODE.BAD_REQUEST);
        }
        const message = {
            notification: {
                title,
                body,
            },
            android: {
                notification: {
                    sound: "default",
                },
                data: {
                    title,
                    body,
                },
            },
            token: token,
        };
        const response = await firebase.messaging().send(message);
        console.log("Successfully sent message:", response);
        return message
    } catch (error: any) {
        console.error("Error sending message:", error.message);
        // res.status(500).json({ error: error.message });
        return new ErrorApp(MESSAGE_CODE.BAD_REQUEST, 400, error)
    }
}

export const getNotificationService = async (userId: string) => {
    const user = await getUserById(userId)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const notification = await getNotifications(user.id)
    const data = getNotificationDTOMapper(notification as NotificationData[], user.role as Role)
    const totalLength = notification.filter(e => e.isRead === false).length
    return {
        notification: data,
        count: totalLength
    }
}

export const readNotificationService = async (notificationId: string, userId: string) => {
    const notification = await getNotificationById(notificationId)
    if (!notification) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.NOTIFICATION, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (notification.userId !== userId) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.READ_NOTIFICATION, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const result = await updateStatusNotification(notification.id, true)
    return result

}