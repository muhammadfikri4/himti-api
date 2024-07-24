import { NextFunction, type Request, type Response } from "express";
import { Result } from "../../utils/ApiResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp, HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAnggotaService, deleteAnggotaService, getAnggotaService, updateAnggotaService } from "./anggotaService";
import { AnggotaModelTypes } from "./anggotaTypes";



export const createAnggotaController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, nim, email, angkatanId, isActive } = req.body


    const anggotaCreation = await createAnggotaService({ email, isActive, angkatanId, name, nim }, req as Request);
    if ((anggotaCreation as HttpError)?.message) {
        return HandleResponse(res, (anggotaCreation as HttpError).statusCode, (anggotaCreation as HttpError).code, (anggotaCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ANGGOTA)
}

export const getAnggotaController = async (req: Request, res: Response) => {

    const { page, perPage, search, year } = req.query

    const anggota = await getAnggotaService({

        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        search: search as string,
        year: year as string
    })

    if (anggota instanceof ErrorApp) {
        return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }

    return HandleResponse<AnggotaModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.GET, (anggota as unknown as Result<AnggotaModelTypes[]>)?.data, (anggota as unknown as Result)?.meta)

}

export const deleteAnggotaController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteStruktural = await deleteAnggotaService({ id });
    if ((deleteStruktural as HttpError)?.message) {
        return HandleResponse(res, (deleteStruktural as HttpError).statusCode, (deleteStruktural as HttpError).code, (deleteStruktural as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.DELETE)
}

export const updateAnggotaController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, isActive, angkatanId, name, nim } = req.body

    const updateAnggota = await updateAnggotaService({ id, email, isActive, name, nim, angkatanId });
    if ((updateAnggota as HttpError)?.message) {
        return HandleResponse(res, (updateAnggota as HttpError).statusCode, (updateAnggota as HttpError).code, (updateAnggota as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.UPDATE)
}

