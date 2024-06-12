import { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "src/assets/images/struktural");
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().getTime()}_${file.originalname}`);
    },
});


const fileFilter = async (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });
// const upload = multer({ storage: multer.memoryStorage() });

export { fileFilter, storage, upload };
