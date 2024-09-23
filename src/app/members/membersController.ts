import { NextFunction, type Request, type Response } from "express";
import { Result } from "../../utils/ApiResponse";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createAnggotaService, deleteAnggotaService, getMembersService, getMemberByIdService, updateAnggotaService } from "./membersService";
import { AnggotaModelTypes } from "./membersTypes";



export const createMemberController = async (req: Request, res: Response, next: NextFunction) => {

    const { name, nim, email, generationId, isActive } = req.body

    const anggota = await createAnggotaService({ email, isActive, generationId, name, nim });
    if (anggota instanceof ErrorApp) {
        next(anggota)
        return
        // return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }

    HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ANGGOTA)
}

export const getMemberController = async (req: Request, res: Response, next: NextFunction) => {

    const { page, perPage, search, angkatan, status } = req.query

    const anggota = await getMembersService({
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        search: search as string,
        year: angkatan as string,
        status: status as string
    })

    if (anggota instanceof ErrorApp) {
        next(anggota)
        return
        // return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }

    HandleResponse<AnggotaModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.GET, (anggota as unknown as Result<AnggotaModelTypes[]>)?.data, (anggota as unknown as Result)?.meta)

}

export const deleteMemberController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const anggota = await deleteAnggotaService(id);
    if (anggota instanceof ErrorApp) {
        next(anggota)
        return
        // return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.DELETE)
}

export const updateMemberController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email, isActive, generationId, name, nim } = req.body

    const anggota = await updateAnggotaService({ id, email, isActive, name, nim, generationId });
    if (anggota instanceof ErrorApp) {
        next(anggota)
        return
        // return HandleResponse(res, anggota.statusCode, anggota.code, anggota.message)
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.UPDATE)
}

export const getMemberByIdController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const member = await getMemberByIdService(id as string);
    if (member instanceof ErrorApp) {
        next(member)
        return
    }
    HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ANGGOTA.GET, member)
}