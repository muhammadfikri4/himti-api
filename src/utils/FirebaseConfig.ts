import admin from 'firebase-admin';
import { FirebaseNotificationMessage } from '../interface/FirebaseNotificationMessage';
import { environment } from '../libs';

export const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: environment.FIREBASE.CLIENT_EMAIL,
        privateKey: environment.FIREBASE.PRIVATE_KEY,
        projectId: environment.FIREBASE.PROJECT_ID
    })
})

export const SendFirebaseNotification = async (message: FirebaseNotificationMessage) => {
    return await firebase.messaging().send(message);
}