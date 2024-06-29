import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export const prisma = new PrismaClient();

// export const dbconnect = async () => {
//     try {
//         await prisma.$connect();
//         console.log('DB connected🚀');
//     } catch (error: unknown) {
//         console.error('Failed to connect to the database:', error);
//     }
// };

// // Jangan lupa untuk menutup koneksi Prisma Client saat aplikasi dihentikan
// process.on('SIGINT', async () => {
//     await prisma.$disconnect();
//     process.exit(0);
// });
