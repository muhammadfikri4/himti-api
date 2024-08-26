import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createAnggotaController, deleteAnggotaController, getAnggotaByIdController, getAnggotaController, updateAnggotaController } from "./anggotaController";
import { createAnggotaSchema } from "./anggotaRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createAnggotaSchema), CatchWrapper(createAnggotaController))
route.get("/", VerifyToken, CatchWrapper(getAnggotaController))
route.get("/:id", VerifyToken, CatchWrapper(getAnggotaByIdController))
route.delete("/:id", CatchWrapper(deleteAnggotaController))
route.put("/:id", CatchWrapper(updateAnggotaController))

export default route