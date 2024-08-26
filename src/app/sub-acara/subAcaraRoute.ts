import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload } from "./subAcaraConfig";
import { createSubAcaraController, deleteSubAcaraController, getDetailSubAcaraController, getSubAcaraController, updateSubAcaraController } from "./subAcaraController";
import { updateSubAcaraSchema } from "./subAcaraRequest";

const route = Router()

route.post("/", VerifyToken, CatchWrapper(upload.single("image")), CatchWrapper(createSubAcaraController))
route.get("/", CatchWrapper(getSubAcaraController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteSubAcaraController))
route.put("/:id", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(updateSubAcaraSchema), CatchWrapper(updateSubAcaraController))
route.get("/:id", CatchWrapper(getDetailSubAcaraController))

export default route