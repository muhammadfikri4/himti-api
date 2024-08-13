import admin from 'firebase-admin'
import pk from '../key/pk.json'

export const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: pk.client_email,
        privateKey: pk.private_key,
        projectId: pk.project_id
    })
})

