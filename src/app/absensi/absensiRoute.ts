import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload } from "./absensiConfig";
import { createAbsensiController, getAbsensiController } from "./absensiController";

const route = Router()

route.post("/", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiController))
route.get("/", VerifyToken, CatchWrapper(getAbsensiController))

export default route