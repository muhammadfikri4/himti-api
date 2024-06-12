import dotenv from 'dotenv'

dotenv.config()

export const ENV = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    BLOB_TOKEN: process.env.BLOB_READ_WRITE_TOKEN
}