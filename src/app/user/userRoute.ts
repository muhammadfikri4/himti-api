import { Router } from "express";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifySuperAdmin } from "../../middleware/verifySuperAdmin";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createUserController, getUsersController } from "./userController";

const route = Router()

// route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiController))
// route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/', VerifyAdmin, CatchWrapper(getUsersController))
route.post('/admin', VerifySuperAdmin, CatchWrapper(createUserController))

export default route