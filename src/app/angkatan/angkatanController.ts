import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAngkatanService } from "../angkatan/angkatanService";

export const createAngkatanController = async (req: Request, res: Response) => {

    const { angkatan, isActive } = req.body

    if (!angkatan) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.REQUIRED.ROLE_NAME)
    }

    const angkatanCreation = await createAngkatanService({ angkatan, isActive });

    if ((angkatanCreation as HttpError)?.message) {
        return HandleResponse(res, (angkatanCreation as HttpError).statusCode, (angkatanCreation as HttpError).code, (angkatanCreation as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ANGKATAN)
}
