import dotenv from 'dotenv';
import mongoose from "mongoose";
import { ENV } from '../libs';

dotenv.config()
const mongoURI = process.env.DB_URL

mongoose.set('strictQuery', true)

export const dbconect = async (): Promise<typeof mongoose | undefined> => {
    try {
        const conn = await mongoose.connect(mongoURI as string, {
            dbName: ENV.DB_NAME,
            user: ENV.DB_USER,
            pass: ENV.DB_PASSWORD
        })
        console.log("DB connected🚀")
        return conn
    } catch (error: unknown) {
        console.log((error as unknown as any).message)
    }
}
// mongodb + srv://muhfikriantoaji:muhfikri04@cluster0.rupsheq.mongodb.net/