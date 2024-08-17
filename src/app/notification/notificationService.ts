import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { firebase } from "../../utils/FirebaseConfig"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getSubAcaraById } from "../acara/acaraRepository"
import { getAllFCMUser } from "../user-fcm/user-fcm.repository"
import { NotificationData, getNotificationDTOMapper } from "./notificationMapper"
import { createNotification, getNotifications } from "./notificationRepository"

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
        // if (!token || typeof token !== 'string') {
        //     throw new Error('Invalid FCM token provided');
        // }

        await Promise.all(fcm.map(async (item) => {
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
                token: item.fcmToken,
            };
            await firebase.messaging().send(message);

        }))
        console.log("Successfully sent message:");
        const result = await createNotification(title, body, idAcara, subAcaraId)
        return result
    } catch (error: any) {
        if (error.message.toLowerCase() === "auth error from apns or web push service") {

            const result = await createNotification(title, body, idAcara, subAcaraId)
            return result
        }
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

export const getNotificationService = async () => {
    const notification = await getNotifications()
    const data = getNotificationDTOMapper(notification as NotificationData[])
    return data
}