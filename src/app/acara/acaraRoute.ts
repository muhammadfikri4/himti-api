import { Router } from "express";
import { upload } from "./acaraConfig";
import { createAcaraController, deleteAcaraController, getAcaraController, updateAcaraController } from "./acaraController";

const route = Router()

route.post("/", upload.single("image"), createAcaraController)
route.get("/", getAcaraController)
route.delete("/:id", deleteAcaraController)
route.put("/:id", upload.single("image"), updateAcaraController)

export default route