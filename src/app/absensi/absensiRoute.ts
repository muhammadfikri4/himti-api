import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { upload } from "./absensiConfig";
import { createAbsensiAcaraController, createAbsensiSubAcaraController, getAbsensiController } from "./absensiController";

const route = Router()

route.post("/acara", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiAcaraController))
route.post("/sub-acara", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiSubAcaraController))
route.get("/", VerifyToken, CatchWrapper(getAbsensiController))

export default route