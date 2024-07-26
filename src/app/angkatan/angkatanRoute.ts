import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createAngkatanController, deleteAngkatanController, getAngkatanController, updateAngkatanController } from "./angkatanController";
import { createAngkatanSchema } from "./angkatanRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createAngkatanSchema), CatchWrapper(createAngkatanController))
route.get("/", VerifyToken, getAngkatanController)
route.delete("/:id", VerifyToken, deleteAngkatanController)
route.put("/:id", VerifyToken, updateAngkatanController)

export default route