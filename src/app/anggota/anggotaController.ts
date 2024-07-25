import { NextFunction, type Request, type Response } from "express";
import { Result } from "../../utils/ApiResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAnggotaService, deleteAnggotaService, getAnggotaService, updateAnggotaService } from "./anggotaService";
import { AnggotaModelTypes } from "./anggotaTypes";



export const createAnggotaController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, nim, email, angkatanId, isActive } = req.body

    const anggota = await createAnggotaService({ email, isActive, angkatanId, name, nim }, req as Request);
    if (anggota instanceof ErrorApp) {
        return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }

    return HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ANGGOTA)
}

export const getAnggotaController = async (req: Request, res: Response) => {

    const { page, perPage, search, angkatan } = req.query

    const anggota = await getAnggotaService({
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        search: search as string,
        year: angkatan as string
    })

    if (anggota instanceof ErrorApp) {
        return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }

    return HandleResponse<AnggotaModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.GET, (anggota as unknown as Result<AnggotaModelTypes[]>)?.data, (anggota as unknown as Result)?.meta)

}

export const deleteAnggotaController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const anggota = await deleteAnggotaService({ id });
    if (anggota instanceof ErrorApp) {
        return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.DELETE)
}

export const updateAnggotaController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, isActive, angkatanId, name, nim } = req.body

    const anggota = await updateAnggotaService({ id, email, isActive, name, nim, angkatanId });
    if (anggota instanceof ErrorApp) {
        return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.UPDATE)
}

