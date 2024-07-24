import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { createAnggotaController, deleteAnggotaController, getAnggotaController, updateAnggotaController } from "./anggotaController";
import { createAnggotaSchema } from "./anggotaRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createAnggotaSchema), createAnggotaController)
route.get("/", VerifyToken, getAnggotaController)
route.delete("/:id", deleteAnggotaController)
route.put("/:id", updateAnggotaController)

export default route