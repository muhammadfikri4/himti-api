import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createAngkatanController, deleteAngkatanController, getAngkatanByIdController, getAngkatanController, updateAngkatanController } from "./generationsController";
import { createAngkatanSchema } from "./generationsRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createAngkatanSchema), CatchWrapper(createAngkatanController))
route.get("/", VerifyToken, CatchWrapper(getAngkatanController))
route.get('/:id', VerifyToken, CatchWrapper(getAngkatanByIdController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteAngkatanController))
route.put("/:id", VerifyToken, CatchWrapper(updateAngkatanController))

export default route