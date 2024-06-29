import { NextFunction, type Request, type Response } from "express";
import { Result } from '../../utils/ApiResponse';
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { AcaraBodyDTO } from "./acaraDTO";
import { createAcaraService, deleteAcaraService, getAcaraService, updateAcaraService } from "./acaraService";
import { AcaraModelTypes } from "./acaraTypes";



export const createAcaraController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, description, endTime, isOpen, startTime, } = req.body as AcaraBodyDTO


    const strukturalCreation = await createAcaraService({ name, description, endTime, image: req.file?.path, isOpen, startTime });
    if ((strukturalCreation as HttpError)?.message) {

        return HandleResponse(res, (strukturalCreation as HttpError).statusCode, (strukturalCreation as HttpError).code, (strukturalCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ACARA)
}

export const getAcaraController = async (req: Request, res: Response) => {

    const { name, page, perPage } = req.query

    const acara = await getAcaraService({ name: name as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined });

    if (!acara.data.length) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.ACARA, acara.data, acara.meta)
    }
    HandleResponse<AcaraModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ACARA.GET, (acara as unknown as Result<AcaraModelTypes[]>)?.data, (acara as unknown as Result)?.meta)

}

export const deleteAcaraController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteStruktural = await deleteAcaraService({ id });
    if ((deleteStruktural as HttpError)?.message) {
        return HandleResponse(res, (deleteStruktural as HttpError).statusCode, (deleteStruktural as HttpError).code, (deleteStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ACARA.DELETE)
}

export const updateAcaraController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, endTime, image, isOpen, startTime, } = req.body as AcaraBodyDTO

    const updateStruktural = await updateAcaraService({ id, name, description, endTime, isOpen, startTime, image: req.file?.path });
    if ((updateStruktural as HttpError)?.message) {
        return HandleResponse(res, (updateStruktural as HttpError).statusCode, (updateStruktural as HttpError).code, (updateStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ACARA.UPDATE)
}

