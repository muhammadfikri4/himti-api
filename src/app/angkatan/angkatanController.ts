import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAngkatanService, deleteAngkatanService, getAngkatanService, updateAngkatanService } from "../angkatan/angkatanService";
import { AngkatanBodyDTO } from "./angkatanDTO";
import { IFilterAngkatan } from "./angkatanTypes";

export const createAngkatanController = async (req: Request, res: Response) => {

    const { year, isActive } = req.body as AngkatanBodyDTO

    const angkatanCreation = await createAngkatanService({ year: year?.toString(), isActive });

    if ((angkatanCreation as HttpError)?.message) {
        return HandleResponse(res, (angkatanCreation as HttpError).statusCode, (angkatanCreation as HttpError).code, (angkatanCreation as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ANGKATAN)
}

export const getAngkatanController = async (req: Request, res: Response) => {

    const { search, page, perPage } = req.query as IFilterAngkatan

    const angkatan = await getAngkatanService({ search: search as string, page: Number(page) || undefined, perPage: Number(perPage) || undefined })

    if (!angkatan.data.length) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.ANGKATAN.NAME, angkatan.data, angkatan.meta)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.GET, angkatan.data, angkatan.meta)

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
    const { year, isActive } = req.body as AngkatanBodyDTO



    const updateAngkatan = await updateAngkatanService({ id, year: year ? year.toString() : undefined, isActive });
    if ((updateAngkatan as HttpError)?.message) {
        return HandleResponse(res, (updateAngkatan as HttpError).statusCode, (updateAngkatan as HttpError).code, (updateAngkatan as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.UPDATE)
}

