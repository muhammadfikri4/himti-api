import { v2 as cloudinary } from 'cloudinary';
import { type Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { environment } from '../../libs';
import { MESSAGE_CODE } from '../../utils/ErrorCode';
import { ErrorApp } from '../../utils/HttpError';
import { MESSAGES } from '../../utils/Messages';

cloudinary.config({
    cloud_name: environment.CLOUDINARY_CLOUD_NAME,
    api_key: environment.CLOUDINARY_API_KEY,
    api_secret: environment.CLOUDINARY_API_SECRET
});

// Konfigurasi Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        public_id: () => `acara/${+new Date()}`,
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else if (file.size > 5242880) {

        cb(null, false);
        return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)
    } else {
        cb(null, false);
        return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_TYPE, 400, MESSAGE_CODE.BAD_REQUEST)
    }
};

const upload = multer({ storage, fileFilter });
export { upload };
