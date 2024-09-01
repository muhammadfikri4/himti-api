import { createCanvas, loadImage, registerFont } from 'canvas';
import { Router, type Request, type Response } from "express";
import path from "path";
import PDFDocument from 'pdfkit';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import absensiRoute from '../app/attendances/attendancesRoute';
import prestasiRoute from '../app/achievements/achievementsRoute';
import authRoute from '../app/authentication/authRoute';
import businessRoute from '../app/business/businessRoute';
import dosenRoute from '../app/lecturers/lecturersRoute';
import acaraRoute from '../app/event/eventRoute';
import angkatanRoute from '../app/generations/generationsRoute';
import initialRoute from '../app/initial/initialRoute';
import anggotaRoute from '../app/members/membersRoute';
// import notificationRoute from '../app/notification/notificationRoute';
import profileRoute from '../app/profile/profileRoute';
import strukturalRoute from '../app/struktural/strukturalRoute';
// import subAcaraRoute from '../app/sub-acara/subAcaraRoute';
import userFcmRoute from '../app/user-fcm/user-fcmRoute';
import userRoute from '../app/user/userRoute';
import versionRoute from '../app/version/versionRoute';
import eventMeetingRoute from '../app/eventMeeting/eventMeetingRoute';
import meetingRoute from '../app/meetings/meetingsRoute';
import { MESSAGE_CODE } from "../utils/ErrorCode";
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
route.use("/event-meeting", eventMeetingRoute)
route.use("/meeting", meetingRoute)
// route.use("/sub-acara", subAcaraRoute)
route.use('/business', businessRoute)
route.use('/prestasi', prestasiRoute)
route.use('/user', userRoute)
// route.use('/notification', notificationRoute)
route.use('/user-fcm', userFcmRoute)
route.use('/initial', initialRoute)
route.use('/version', versionRoute)


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