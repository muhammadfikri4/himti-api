import { DeleteObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3"
import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import { environment } from "../libs"
import { MESSAGE_CODE } from "./ErrorCode"
import { ErrorApp } from "./HttpError"

export interface FileInterface {
    ContentType: string
    ACL: any
    Bucket: string
    Key: string
    Body: Buffer
}

export const FileType: Record<string, string> = {
    'image/pdf': '.pdf',
    'image/png': '.png',
    'image/jpeg': '.jpeg',
    'image/jpg': '.jpg',
    'application/pdf': '.pdf',
}

export const storage = multer.memoryStorage()

export const MulterFileFilter = (
    request: Request,
    file: Express.Multer.File,
    callBack: FileFilterCallback,
): void => {
    console.log(file)
    if (file.mimetype && FileType[file.mimetype]) {
        callBack(null, true)
    } else {
        callBack(null, false)
        callBack(
            new ErrorApp(
                'Tipe file tidak mendukung, tipe file harus berjenis: png, jpg, dan jpeg',
                400,
                MESSAGE_CODE.BAD_REQUEST
            ),
        )
    }
}

export const StorageS3Client = new S3({
    forcePathStyle: true,
    endpoint: environment.STORAGE.ENDPOINT,
    credentials: {
        accessKeyId: environment.STORAGE.ACCESS_KEY,
        secretAccessKey: environment.STORAGE.SECRET_KEY
    },
    region: environment.STORAGE.REGION
})

export const UploadFileToStorage = async (data: FileInterface) => {
    try {
        const file = await StorageS3Client.send(new PutObjectCommand(data))
        const object = `${data.Bucket}/${data.Key}`
        console.log('success', object, file)
        return {
            file,
            object
        }
    } catch (error) {
        console.log('error', error)
    }
}

export const RemoveFileFromStorage = async (key: string) => {
    try {
        const file = new DeleteObjectCommand({
            Bucket: environment.STORAGE.BUCKET,
            Key: key
        })
        const result = await StorageS3Client.send(file)
        return result
    } catch (error) {
        console.log(error)
    }
}


export const upload = multer({
    storage,
    limits: {
        fileSize: 5000000,
    },
    fileFilter: MulterFileFilter
})