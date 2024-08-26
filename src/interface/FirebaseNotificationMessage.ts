export interface FirebaseNotificationMessage {

    notification: {
        title: string,
        body: string,
    },
    android: {
        notification: {
            sound: "default",
        },
        data: {
            title: string,
            body: string,
        },
    },
    token: string

}