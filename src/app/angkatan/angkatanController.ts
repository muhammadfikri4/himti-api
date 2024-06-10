import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAngkatanService, deleteAngkatanService, getAngkatanService, updateAngkatanService } from "../angkatan/angkatanService";

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

export const getAngkatanController = async (req: Request, res: Response) => {

    const { search } = req.query

    const angkatan = await getAngkatanService({ search: search as string })

    if (!angkatan.length) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.ANGKATAN, angkatan)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.GET, angkatan)

}

export const deleteAngkatanController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteAngkatan = await deleteAngkatanService({ id });
    if ((deleteAngkatan as HttpError)?.message) {
        return HandleResponse(res, (deleteAngkatan as HttpError).statusCode, (deleteAngkatan as HttpError).code, (deleteAngkatan as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.DELETE)
}

export const updateAngkatanController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { angkatan, isActive } = req.body

    const updateAngkatan = await updateAngkatanService({ id, angkatan, isActive });
    if ((updateAngkatan as HttpError)?.message) {
        return HandleResponse(res, (updateAngkatan as HttpError).statusCode, (updateAngkatan as HttpError).code, (updateAngkatan as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.UPDATE)
}

