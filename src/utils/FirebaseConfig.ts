import admin from 'firebase-admin'
import { environment } from '../libs'

export const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: environment.FIREBASE.CLIENT_EMAIL,
        privateKey: environment.FIREBASE.PRIVATE_KEY,
        projectId: environment.FIREBASE.PROJECT_ID
    })
})

