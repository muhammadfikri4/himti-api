import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { imageSchema } from "../global/imageRequest";
import { upload } from "./strukturalConfig";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";
import { createStrukturalSchema } from "./strukturalRequest";


const route = Router()

route.post("/", VerifyToken, upload.single("image"), validateRequest(createStrukturalSchema, imageSchema), CatchWrapper(createStrukturalController))
route.get("/", VerifyToken, CatchWrapper(getStrukturalController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteStrukturalController))
route.put("/:id", VerifyToken, upload.single("image"), CatchWrapper(updateStrukturalController))

export default route