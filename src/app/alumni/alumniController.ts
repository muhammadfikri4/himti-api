// import { NextFunction, type Request, type Response } from "express";
// import { Result } from '../../utils/ApiResponse';
// import { MESSAGE_CODE } from "../../utils/ErrorCode";
// import { HandleResponse } from "../../utils/HandleResponse";
// import { HttpError } from "../../utils/HttpError";
// import { MESSAGES } from "../../utils/Messages";
// import { AlumniBodyDTO } from "./alumniDTO";
// import { createAlumniService, deleteAlumniService, getAlumniService, updateAlumniService } from "./alumniService";
// import { AlumniModelTypes } from "./alumniTypes";

// export const createAlumniController = async (req: Request, res: Response, next: NextFunction) => {

//     const { isActive, anggotaId, company } = req.body as AlumniBodyDTO

//     const strukturalCreation = await createAlumniService({ isActive, anggotaId, company, image: req.file?.path });
//     if ((strukturalCreation as HttpError)?.message) {
//         return HandleResponse(res, (strukturalCreation as HttpError).statusCode, (strukturalCreation as HttpError).code, (strukturalCreation as HttpError).message)
//     }
//     return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ALUMNI)
// }

// export const getAlumniController = async (req: Request, res: Response) => {

//     const { name, page, perPage } = req.query

//     const alumni = await getAlumniService({ name: name as string, page: page ? Number(page) : undefined, perPage: perPage ? Number(perPage) : undefined });

//     if (!alumni.data.length) {
//         return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND.ALUMNI, alumni.data, alumni.meta)
//     }
//     HandleResponse<AlumniModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ALUMNI.GET, (alumni as unknown as Result<AlumniModelTypes[]>)?.data, (alumni as unknown as Result)?.meta)

// }

// export const deleteAlumniController = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     const deleteStruktural = await deleteAlumniService({ id });
//     if ((deleteStruktural as HttpError)?.message) {
//         return HandleResponse(res, (deleteStruktural as HttpError).statusCode, (deleteStruktural as HttpError).code, (deleteStruktural as HttpError).message)
//     }
//     HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ALUMNI.DELETE)
// }

// export const updateAlumniController = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { isActive, anggotaId, company } = req.body

//     const updateStruktural = await updateAlumniService({ id, isActive, image: req.file?.path, anggotaId, company });
//     if ((updateStruktural as HttpError)?.message) {
//         return HandleResponse(res, (updateStruktural as HttpError).statusCode, (updateStruktural as HttpError).code, (updateStruktural as HttpError).message)
//     }
//     HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ALUMNI.UPDATE)
// }

