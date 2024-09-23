import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { GenerationBodyDTO, IFilterGeneration } from "./generationsDTO";
import { createGenerationService, deleteGenerationService, getGenerationByIdService, getGenerationService, updateGenerationService } from "./generationsService";

export const createAngkatanController = async (req: Request, res: Response, next: NextFunction) => {

    const { year, isActive } = req.body as GenerationBodyDTO

    const angkatan = await createGenerationService({ year: year?.toString(), isActive });

    if (angkatan instanceof ErrorApp) {
        next(angkatan)
        return
        // return HandleResponse(res, angkatan.statusCode, angkatan.code, angkatan.message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ANGKATAN)
}

export const getAngkatanController = async (req: Request, res: Response, next: NextFunction) => {

    const { search, page, perPage, status } = req.query as IFilterGeneration

    const angkatan = await getGenerationService({
        search: search as string,
        page: Number(page) || undefined,
        perPage: Number(perPage) || undefined,
        status
    })

    if (angkatan instanceof ErrorApp) {
        next(angkatan)
        return
        // return HandleResponse(res, angkatan.statusCode, angkatan.code, angkatan.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.GET, angkatan.data, angkatan.meta)

}

export const deleteAngkatanController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const angkatan = await deleteGenerationService({ id });
    if (angkatan instanceof ErrorApp) {
        next(angkatan)
        return
        // return HandleResponse(res, angkatan.statusCode, angkatan.code, angkatan.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.DELETE)
}

export const updateAngkatanController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { year, isActive } = req.body as GenerationBodyDTO

    const angkatan = await updateGenerationService({ id, year: year ? year : undefined, isActive });
    if (angkatan instanceof ErrorApp) {
        next(angkatan)
        return
        // return HandleResponse(res, angkatan.statusCode, angkatan.code, angkatan.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.UPDATE)
}

export const getAngkatanByIdController = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const angkatan = await getGenerationByIdService(id as string);
    if (angkatan instanceof ErrorApp) {
        next(angkatan)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGKATAN.GET, angkatan)
}