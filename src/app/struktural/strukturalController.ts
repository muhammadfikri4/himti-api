import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createStrukturalService, deleteStrukturalService, getStrukturalService, updateStrukturalService } from "./strukturalService";


export const createStrukturalController = async (req: Request, res: Response, next: NextFunction) => {

    const { memberId, jabatan, isActive } = req.body

    const struktural = await createStrukturalService({ isActive, jabatan, memberId, }, req as Request);
    if (struktural instanceof ErrorApp) {
        next(struktural)
        return
        // return HandleResponse(res, struktural.statusCode, struktural.code, struktural.message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.STRUKTURAL)
}

export const getStrukturalController = async (req: Request, res: Response, next: NextFunction) => {

    const { search, page, perPage } = req.query

    const struktural = await getStrukturalService({ search: search as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined });

    if (struktural instanceof ErrorApp) {
        next(struktural)
        return
        // return HandleResponse(res, struktural.statusCode, struktural.code, struktural.message)
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.GET, struktural?.data, struktural?.meta)

}

export const deleteStrukturalController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const struktural = await deleteStrukturalService({ id });
    if (struktural instanceof ErrorApp) {
        next(struktural)
        return
        // return HandleResponse(res, struktural.statusCode, struktural.code, struktural.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.DELETE)
}

export const updateStrukturalController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { isActive, jabatan, memberId } = req.body

    const struktural = await updateStrukturalService({ id, isActive, memberId, jabatan, image: req.file?.path });
    if (struktural instanceof ErrorApp) {
        next(struktural)
        return
        // return HandleResponse(res, struktural.statusCode, struktural.code, struktural.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.STRUKTURAL.UPDATE)
}

