import { createCanvas, loadImage, registerFont } from 'canvas';
import { Router, type Request, type Response } from "express";
import path from "path";
import PDFDocument from 'pdfkit';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import absensiRoute from '../app/absensi/absensiRoute';
import acaraRoute from '../app/acara/acaraRoute';
import anggotaRoute from '../app/anggota/anggotaRoute';
import angkatanRoute from '../app/angkatan/angkatanRoute';
import authRoute from '../app/authentication/authRoute';
import businessRoute from '../app/business/businessRoute';
import dosenRoute from '../app/dosen/dosenRoute';
import prestasiRoute from '../app/prestasi/prestasiRoute';
import profileRoute from '../app/profile/profileRoute';
import strukturalRoute from '../app/struktural/strukturalRoute';
import subAcaraRoute from '../app/sub-acara/subAcaraRoute';
import { getAllFCMUser } from '../app/user-fcm/user-fcm.repository';
import userRoute from '../app/user/userRoute';
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { firebase } from '../utils/FirebaseConfig';
import { MESSAGES } from "../utils/Messages";

const route = Router();

route.use("/auth", authRoute);
route.use("/profile", profileRoute);
route.use("/absensi", absensiRoute);
route.use("/angkatan", angkatanRoute)
route.use("/dosen", dosenRoute)
route.use("/struktural", strukturalRoute)
route.use("/anggota", anggotaRoute)
route.use("/acara", acaraRoute)
route.use("/sub-acara", subAcaraRoute)
route.use('/business', businessRoute)
route.use('/prestasi', prestasiRoute)
route.use('/user', userRoute)
route.get('/bell/:fcm', async (req: Request, res: Response) => {
    // const token = environment.TESTING_FCM
    const token = req.params.fcm
    const title = req.query.title as string || 'testing title notification'
    const body = req.query.body as string || 'testing body notification'

    try {
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid FCM token provided');
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
        res.json({ response, message })
    } catch (error: any) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ error: error.message });
        // throw error;
    }
})
route.get('/bell', async (req: Request, res: Response) => {
    // const token = environment.TESTING_FCM
    // const token = req.params.fcm
    const fcm = await getAllFCMUser()
    const title = req.query.title as string || 'testing title notification'
    const body = req.query.body as string || 'testing body notification'
    if (!fcm.length) {
        return res.json({ message: "No fcm found" })
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
        res.json({ message: "Successfully sent message" })
    } catch (error: any) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ error: error.message });
        // throw error;
    }
})

registerFont(path.join(__dirname, '../../public/times-new-roman.ttf'), { family: 'Times New Roman' });
route.get('/generate', async (req: Request, res: Response) => {
    const { name, id } = req.query; // Ambil nama dan id dari query parameter

    if (!name || !id) {
        return res.status(400).send('Name and ID are required');
    }

    // Load template sertifikat
    const templatePath = path.join(__dirname, '../../public/Sertifikat-Template.png');
    const canvas = createCanvas(800, 600); // Ukuran sesuai dengan template
    const ctx = canvas.getContext('2d');

    try {
        const template = await loadImage(templatePath);
        ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

        // Set font dan warna teks
        ctx.font = 'thin 36px Times New Roman';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        // Tambahkan teks nama di posisi yang diinginkan
        ctx.fillText(name as string, canvas.width / 2, canvas.height / 2.35);

        const qrCodeOptions = {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            quality: 0.92,
            margin: 1,
            color: {
                dark: '#000000', // Warna foreground (hitam)
                light: '#0000'   // Warna background (transparan)
            }
        };

        // Generate QR code
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify({ id }), qrCodeOptions as QRCodeToDataURLOptions);

        // Load QR code image
        const qrCodeImage = await loadImage(qrCodeUrl);

        // Tentukan posisi dan ukuran QR code pada sertifikat
        const qrCodeSize = 80;
        ctx.drawImage(qrCodeImage, canvas.width - qrCodeSize - 60, canvas.height - qrCodeSize - 20, qrCodeSize, qrCodeSize);

        // Set header respons sebagai PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');


        // Stream gambar ke respons
        // canvas.createPNGStream().pipe(res);

        // Buat dokumen PDF
        const doc = new PDFDocument({
            size: [canvas.width, canvas.height],
            margin: 0
        });

        // Stream PDF ke respons
        doc.pipe(res);

        // Tambahkan gambar canvas ke PDF
        const imageData = canvas.toBuffer();
        doc.image(imageData, 0, 0, { width: canvas.width, height: canvas.height });

        // Akhiri dokumen PDF
        doc.end();
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).send('Error generating certificate');
    }
})

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

route.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        status: 404,
        code: MESSAGE_CODE.NOT_FOUND,
        message: MESSAGES.ERROR.NOT_FOUND.ROUTE
    })
})

export default route