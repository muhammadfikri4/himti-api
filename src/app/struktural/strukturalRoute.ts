import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload } from "../../utils/UploadFileToStorage";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";


const route = Router()

route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createStrukturalController))
route.get("/", VerifyToken, CatchWrapper(getStrukturalController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteStrukturalController))
route.put("/:id", VerifyToken, upload.single("image"), CatchWrapper(updateStrukturalController))

export default route