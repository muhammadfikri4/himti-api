import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { upload } from "./strukturalConfig";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";


const route = Router()

route.post("/", VerifyToken, upload.single("image"), createStrukturalController)
route.get("/", VerifyToken, getStrukturalController)
route.delete("/:id", VerifyToken, deleteStrukturalController)
route.put("/:id", VerifyToken, upload.single("image"), updateStrukturalController)

export default route