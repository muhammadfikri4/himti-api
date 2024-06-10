import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createDosenService, deleteDosenService, getDosenService, updateDosenService } from "../dosen/dosenService";

export const createDosenController = async (req: Request, res: Response) => {

    const { nidn, name, email, numberPhone, mataKuliah, isActive } = req.body

    if (!nidn) {
        return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.REQUIRED.NIDN)
    }
    if (!name) {
        return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.REQUIRED.NAME)
    }

    const dosenCreation = await createDosenService({ email, isActive, mataKuliah, name, nidn, numberPhone });

    if ((dosenCreation as HttpError)?.message) {
        return HandleResponse(res, (dosenCreation as HttpError).statusCode, (dosenCreation as HttpError).code, (dosenCreation as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DOSEN)
}

export const getDosenController = async (req: Request, res: Response) => {

    const { name } = req.query

    const dosen = await getDosenService({ name: name as string })

    if (!dosen.length) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.DOSEN, dosen)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.GET, dosen)

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
    const { nidn, name, email, numberPhone, mataKuliah, isActive } = req.body

    if (!nidn) {
        return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.REQUIRED.NIDN)
    }
    if (!name) {
        return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, MESSAGES.ERROR.REQUIRED.NAME)
    }

    const updateDosen = await updateDosenService({ id, email, isActive, mataKuliah, name, nidn, numberPhone });
    if ((updateDosen as HttpError)?.message) {
        return HandleResponse(res, (updateDosen as HttpError).statusCode, (updateDosen as HttpError).code, (updateDosen as HttpError).message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.UPDATE)
}

