import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createDosenController, deleteDosenController, getDosenController, updateDosenController } from "./dosenController";
import { createDosenSchema } from "./dosenRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createDosenSchema), CatchWrapper(createDosenController))
route.get("/", VerifyToken, CatchWrapper(getDosenController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteDosenController))
route.put("/:id", VerifyToken, CatchWrapper(updateDosenController))

export default route