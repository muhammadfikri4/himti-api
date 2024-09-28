import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createEventSchema } from "./eventRequest";
import {
  createEventService,
  deleteEventService,
  getDetailEventService,
  getEventService,
  updateEventService,
} from "./eventService";

export const createEventController = async (
  req: Request & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const file = req.file;
  const combine = { ...body };
  if (file) {
    combine.image = file;
  }
  const validate = createEventSchema.validate(combine);
  console.log(validate);
  if (validate.error) {
    next(
      new ErrorApp(
        validate.error.message.replace(/"/g, ""),
        400,
        MESSAGE_CODE.BAD_REQUEST
      )
    );
    return;
  }
  const acara = await createEventService(combine);
  if (acara instanceof ErrorApp) {
    next(acara);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.ACARA);
};

export const getEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  const acara = await getEventService(query);

  if (acara instanceof ErrorApp) {
    next(acara);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ACARA.GET,
    acara.data,
    acara.meta
  );
};

export const deleteEventController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const acara = await deleteEventService(id);
  if (acara instanceof ErrorApp) {
    return HandleResponse(res, acara.statusCode, acara.code, acara.message);
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ACARA.DELETE);
};

export const updateEventController = async (
  req: Request & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  // const { name, description, endTime, isOpenAbsen, isOpenRegister, startTime, } = req.body
  const { body } = req;

  const acara = await updateEventService({ ...body, id, image: req.file });
  if (acara instanceof ErrorApp) {
    next(acara);
    return;
  }
  HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.ACARA.UPDATE);
};

export const getDetailEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const acara = await getDetailEventService(id as string);
  if (acara instanceof ErrorApp) {
    next(acara);
    return;
  }
  return HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ACARA.GET,
    acara
  );
};
