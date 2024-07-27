import dotenv from 'dotenv'

dotenv.config()

export const environment = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    ANGGOTA_CODE: process.env.ANGGOTA_CODE
}