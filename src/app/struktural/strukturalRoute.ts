import { Router } from "express";
import { upload } from "./strukturalConfig";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";

const route = Router()

route.post("/", upload.single("image"), createStrukturalController)
route.get("/", getStrukturalController)
route.delete("/:id", deleteStrukturalController)
route.put("/:id", updateStrukturalController)

export default route