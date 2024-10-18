import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import {
  deletePhotoProfile,
  getProfileService,
  updatePasswordService,
  updateProfileService,
} from "./profileService";
import { RequestWithAccessToken } from "../../interface/Request";
import { updateProfileSchema } from "./profileRequest";

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization?.replace("Bearer ", "");
  const profile = await getProfileService(bearerToken as string);

  if (profile instanceof ErrorApp) {
    next(profile);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PROFILE.GET,
    profile
  );
};

export const updateProfileController = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { body, userId } = req;
  const file = req.file;
  const combine = { ...body };
  if (file) {
    combine.photo = file;
  }
  const validate = updateProfileSchema.validate(combine);
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
  const profile = await updateProfileService(userId ?? "", combine);
  if (profile instanceof ErrorApp) {
    next(profile);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PROFILE.UPDATE,
    profile
  );
};

export const updatePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization?.replace("Bearer ", "");
  const { newPassword, oldPassword } = req.body;
  const profile = await updatePasswordService(bearerToken as string, {
    newPassword,
    oldPassword,
  });
  if (profile instanceof ErrorApp) {
    next(profile);
    return;
  }

  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PROFILE.UPDATE
  );
};

export const deletePhotoProfileController = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  const profile = await deletePhotoProfile(userId as string);
  if (profile instanceof ErrorApp) {
    next(profile);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PROFILE.DELETE_PHOTO
  )
};
