import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload as UploadFile } from "../../utils/UploadFileToStorage";
import {
    getProfileController,
    updatePasswordController,
    updateProfileController,
} from "./profileController";
import { updatePasswordSchema } from "./profileRequest";


const route = Router();

route.get("/", VerifyToken, CatchWrapper(getProfileController));
route.put(
  "/",
  VerifyToken,
//   validateRequest(updateProfileSchema),
  CatchWrapper(UploadFile.single("photo")),
  CatchWrapper(updateProfileController)
);
route.put(
  "/password",
  VerifyToken,
  validateRequest(updatePasswordSchema),
  CatchWrapper(updatePasswordController)
);

export default route;
