import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload } from "./strukturalConfig";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";
import { createStrukturalSchema } from "./strukturalRequest";


const route = Router()

route.post("/", VerifyToken, upload.single("image"), validateRequest(createStrukturalSchema), CatchWrapper(createStrukturalController))
route.get("/", VerifyToken, getStrukturalController)
route.delete("/:id", VerifyToken, deleteStrukturalController)
route.put("/:id", VerifyToken, upload.single("image"), updateStrukturalController)

export default route