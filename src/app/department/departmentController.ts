import { type Request, type Response } from "express";
import { MetaResponse } from "interface/ResponseInterface";
import { Result } from "../../utils/ApiResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { DosenBodyDTO } from "./departmentDTO";
import { createDosenService, deleteDosenService, getDosenService, updateDosenService } from "./departmentService";
import { DosenModelTypes, IFilterDosen } from "./departmentTypes";


export const createDosenController = async (req: Request, res: Response) => {

    const { nidn, name, email, numberPhone, lesson, isActive } = req.body as DosenBodyDTO

    const dosenCreation = await createDosenService({ email, isActive, lesson, name, nidn, numberPhone });

    if ((dosenCreation as HttpError)?.message) {
        return HandleResponse(res, (dosenCreation as HttpError).statusCode, (dosenCreation as HttpError).code, (dosenCreation as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.DOSEN)
}

export const getDosenController = async (req: Request, res: Response) => {

    const { name, email, nidn, page, perPage } = req.query as IFilterDosen

    const dosen = await getDosenService({ name: name as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined, email, nidn });
    if (!dosen.data.length) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.DOSEN, (dosen as unknown as Result<DosenModelTypes>)?.data, (dosen as unknown as Result<DosenModelTypes>)?.meta as MetaResponse)
    }
    return HandleResponse<DosenModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.DOSEN.GET, (dosen as unknown as Result<DosenModelTypes[]>)?.data, (dosen as unknown as Result<DosenModelTypes[]>)?.meta as MetaResponse)

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
