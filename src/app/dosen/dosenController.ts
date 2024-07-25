import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp, HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { DosenBodyDTO } from "./dosenDTO";
import { createDosenService, deleteDosenService, getDosenService, updateDosenService } from "./dosenService";
import { IFilterDosen } from "./dosenTypes";


export const createDosenController = async (req: Request, res: Response) => {

    const { nidn, name, email, numberPhone, lesson, isActive } = req.body as DosenBodyDTO

    const dosenCreation = await createDosenService({ email, isActive, lesson, name, nidn, numberPhone });

    if ((dosenCreation as HttpError)?.message) {
        return HandleResponse(res, (dosenCreation as HttpError).statusCode, (dosenCreation as HttpError).code, (dosenCreation as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DOSEN)
}

export const getDosenController = async (req: Request, res: Response) => {

    const { search, page, perPage } = req.query as IFilterDosen

    const dosen = await getDosenService({ search, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined });
    if (dosen instanceof ErrorApp) {
        return HandleResponse(res, dosen.statusCode, dosen.code, dosen.message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.GET, dosen?.data, dosen?.meta)

}

export const deleteDosenController = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteAngkatan = await deleteDosenService({ id });
    if ((deleteAngkatan as HttpError)?.message) {
        return HandleResponse(res, (deleteAngkatan as HttpError).statusCode, (deleteAngkatan as HttpError).code, (deleteAngkatan as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.DELETE)
}

export const updateDosenController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nidn, name, email, numberPhone, lesson, isActive } = req.body as DosenBodyDTO

    const updateDosen = await updateDosenService({ id, email, isActive, lesson, name, nidn, numberPhone });
    if ((updateDosen as HttpError)?.message) {
        return HandleResponse(res, (updateDosen as HttpError).statusCode, (updateDosen as HttpError).code, (updateDosen as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.UPDATE)
}

