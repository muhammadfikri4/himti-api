import { type Request } from "express";
import { FileFilterCallback } from "multer";
import { MESSAGE_CODE } from "./ErrorCode";
import { ErrorApp } from "./HttpError";
import { MESSAGES } from "./Messages";

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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