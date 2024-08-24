import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifySuperAdmin } from "../../middleware/verifySuperAdmin";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createUserController, getUserController, getUsersController, updateUserController } from "./userController";
import { createUserSchema, updateUserSchema } from "./userRequest";

const route = Router()

// route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiController))
// route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/', VerifyAdmin, CatchWrapper(getUsersController))
route.get('/:userId', VerifyAdmin, CatchWrapper(getUserController))
route.post('/admin', VerifySuperAdmin, validateRequest(createUserSchema), CatchWrapper(createUserController))
route.put('/admin/:userId', VerifySuperAdmin, validateRequest(updateUserSchema), CatchWrapper(updateUserController))

export default route