import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifySuperAdmin } from "../../middleware/verifySuperAdmin";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createUserController, getUserController, getUsersController } from "./userController";
import { createUserSchema } from "./userRequest";

const route = Router()

// route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiController))
// route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/', VerifyAdmin, CatchWrapper(getUsersController))
route.get('/:userId', VerifyAdmin, CatchWrapper(getUserController))
route.post('/admin', VerifySuperAdmin, validateRequest(createUserSchema), CatchWrapper(createUserController))

export default route