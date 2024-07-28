import { Router } from "express";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { getUsersController } from "./userController";

const route = Router()

// route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiController))
// route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/', VerifyAdmin, CatchWrapper(getUsersController))

export default route