import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createRoleService } from "./roleService";

export const createRoleController = async (req: Request, res: Response) => {

    const { name, isActive } = req.body

    if (!name) {
        return HandleResponse(res, 404, MESSAGE_CODE.NOT_FOUND, MESSAGES.ERROR.REQUIRED.ROLE_NAME)
    }

    const role = await createRoleService({ name, isActive });

    if ((role as HttpError)?.message) {
        return HandleResponse(res, (role as HttpError).statusCode, (role as HttpError).code, (role as HttpError).message)
    }
    HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ROLE)
}
