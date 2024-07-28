import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { imageSchema } from "../global/imageRequest";
import { upload } from "./acaraConfig";
import { createAcaraController, deleteAcaraController, getAcaraController, getDetailAcaraController, updateAcaraController } from "./acaraController";
import { createAcaraSchema } from "./acaraRequest";

const route = Router()

route.post("/", VerifyToken, upload.single("image"), validateRequest(createAcaraSchema, imageSchema), CatchWrapper(createAcaraController))
route.get("/", getAcaraController)
route.delete("/:id", VerifyToken, deleteAcaraController)
route.put("/:id", VerifyToken, upload.single("image"), updateAcaraController)
route.get("/:id", getDetailAcaraController)

export default route