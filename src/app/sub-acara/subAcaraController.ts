import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp, HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { SubAcaraBodyDTO } from "./subAcaraDTO";
import { createSubAcaraService, deleteSubAcaraService, getDetailSubAcaraService, getSubAcaraService, updateSubAcaraService } from "./subAcaraService";



export const createSubAcaraController = async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body as SubAcaraBodyDTO
    const file = req.file
    // const combineBodyFile = { ...body, image: file as unknown as File }
    // const bv = createSubAcaraSchema.validate(combineBodyFile)
    // console.log(combineBodyFile)
    // console.log(bv.error)
    // if (bv.error) {
    //     const err = new ErrorApp(bv.error.details[0].message.replace(/"/g, ''), 400, MESSAGE_CODE.BAD_REQUEST)
    //     next(err)
    //     return
    // }
    // console.log(body)
    const acara = await createSubAcaraService({ ...body, image: file as unknown as string });
    if (acara instanceof ErrorApp) {
        next(acara)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.SUB_ACARA)
}

export const getSubAcaraController = async (req: Request, res: Response, next: NextFunction) => {

    const { search, acaraId, page, perPage } = req.query

    const acara = await getSubAcaraService({ search: search as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined, acaraId: acaraId as string });

    if (acara instanceof ErrorApp) {
        next(acara)
        return
    }

    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.SUB_ACARA.GET, acara.data, acara.meta)

}

export const deleteSubAcaraController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteStruktural = await deleteSubAcaraService({ id });
    if ((deleteStruktural as HttpError)?.message) {
        return HandleResponse(res, (deleteStruktural as HttpError).statusCode, (deleteStruktural as HttpError).code, (deleteStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.SUB_ACARA.DELETE)
}

export const updateSubAcaraController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, endTime, startTime, acaraId } = req.body as SubAcaraBodyDTO

    const updateStruktural = await updateSubAcaraService({ id, name, description, endTime, startTime, image: req.file?.path, acaraId });
    if ((updateStruktural as HttpError)?.message) {
        return HandleResponse(res, (updateStruktural as HttpError).statusCode, (updateStruktural as HttpError).code, (updateStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.SUB_ACARA.UPDATE)
}

export const getDetailSubAcaraController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const acara = await getDetailSubAcaraService(id as string)
    if (acara instanceof ErrorApp) {
        return HandleResponse(res, acara.statusCode, acara.code, acara.message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.SUB_ACARA.GET, acara)
}