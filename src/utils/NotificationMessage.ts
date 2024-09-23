export const NotificationMessage = (title: string, body: string, fcmToken: string) => {
    return {
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
        token: fcmToken
    };
}