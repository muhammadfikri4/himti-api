import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createLecturerController, deleteLecturerController, getLecturerController, updateLecturerController } from "./lecturersController";
import { createDosenSchema } from "./lecturersRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createDosenSchema), CatchWrapper(createLecturerController))
route.get("/", VerifyToken, CatchWrapper(getLecturerController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteLecturerController))
route.put("/:id", VerifyToken, CatchWrapper(updateLecturerController))

export default route