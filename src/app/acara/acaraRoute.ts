import { Router } from "express";
import { upload as UploadFile } from "../../utils/UploadFileToStorage";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createAcaraController, deleteAcaraController, getAcaraController, getDetailAcaraController, updateAcaraController } from "./acaraController";

const route = Router()

route.post("/", VerifyToken, CatchWrapper(UploadFile.single('image')), CatchWrapper(createAcaraController))
route.get("/", CatchWrapper(getAcaraController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteAcaraController))
route.put("/:id", VerifyToken, CatchWrapper(UploadFile.single("image")), CatchWrapper(updateAcaraController))
route.get("/:id", CatchWrapper(getDetailAcaraController))

export default route