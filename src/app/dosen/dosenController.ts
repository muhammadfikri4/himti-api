import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { DosenBodyDTO } from "./dosenDTO";
import { createDosenService, deleteDosenService, getDosenService, updateDosenService } from "./dosenService";
import { IFilterDosen } from "./dosenTypes";


export const createDosenController = async (req: Request, res: Response, next: NextFunction) => {

    const { nidn, name, email, numberPhone, lesson, isActive } = req.body as DosenBodyDTO

    const dosen = await createDosenService({ email, isActive, lesson, name, nidn, numberPhone });

    if (dosen instanceof ErrorApp) {
        next(dosen)
        return
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DOSEN)
}

export const getDosenController = async (req: Request, res: Response, next: NextFunction) => {

    const { search, page, perPage } = req.query as IFilterDosen

    const dosen = await getDosenService({
        search, page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined
    });
    if (dosen instanceof ErrorApp) {
        next(dosen)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.GET, dosen?.data, dosen?.meta)

}

export const deleteDosenController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const dosen = await deleteDosenService({ id });
    if (dosen instanceof ErrorApp) {
        next(dosen)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.DELETE)
}

export const updateDosenController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { nidn, name, email, numberPhone, lesson, isActive } = req.body as DosenBodyDTO

    const dosen = await updateDosenService({ id, email, isActive, lesson, name, nidn, numberPhone });
    if (dosen instanceof ErrorApp) {
        next(dosen)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.UPDATE)
}

