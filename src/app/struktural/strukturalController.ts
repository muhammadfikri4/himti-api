import { NextFunction, type Request, type Response } from "express";
import { Result } from '../../utils/ApiResponse';
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createStrukturalService, deleteStrukturalService, getStrukturalService, updateStrukturalService } from "./strukturalService";
import { StrukturalModelTypes } from "./strukturalTypes";


export const createStrukturalController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, nim, email, jabatan, angkatanId, instagram, twitter, facebook, linkedin, isActive } = req.body


    const strukturalCreation = await createStrukturalService({ email, isActive, jabatan, angkatanId, facebook, instagram, linkedin, name, twitter, nim }, req as Request);
    if ((strukturalCreation as HttpError)?.message) {

        return HandleResponse(res, (strukturalCreation as HttpError).statusCode, (strukturalCreation as HttpError).code, (strukturalCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.STRUKTURAL)
}

export const getStrukturalController = async (req: Request, res: Response) => {

    const { name, page, perPage } = req.query

    const struktural = await getStrukturalService({ name: name as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined });

    if (!struktural.data) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.STRUKTURAL, struktural)
    }
    HandleResponse<StrukturalModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.GET, (struktural as unknown as Result<StrukturalModelTypes[]>)?.data, (struktural as unknown as Result)?.meta)

}

export const deleteStrukturalController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteStruktural = await deleteStrukturalService({ id });
    if ((deleteStruktural as HttpError)?.message) {
        return HandleResponse(res, (deleteStruktural as HttpError).statusCode, (deleteStruktural as HttpError).code, (deleteStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.DELETE)
}

export const updateStrukturalController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, isActive, jabatan, angkatanId, facebook, instagram, linkedin, name, twitter, nim } = req.body

    const updateStruktural = await updateStrukturalService({ id, email, isActive, name, nim, angkatanId, facebook, instagram, linkedin, jabatan, twitter, image: req.file?.path });
    if ((updateStruktural as HttpError)?.message) {
        return HandleResponse(res, (updateStruktural as HttpError).statusCode, (updateStruktural as HttpError).code, (updateStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.UPDATE)
}

