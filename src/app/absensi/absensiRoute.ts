import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { imageSchema } from "../global/imageRequest";
import { upload } from "./absensiConfig";
import { createAbsensiAcaraController, createAbsensiSubAcaraController, getAbsensiController } from "./absensiController";
import { createAbsensiAcaraSchema, createAbsensiSubAcaraSchema } from "./absensiRequest";

const route = Router()

route.post("/acara", VerifyToken, validateRequest(createAbsensiAcaraSchema, imageSchema), upload.single("image"), CatchWrapper(createAbsensiAcaraController))
route.post("/sub-acara", VerifyToken, validateRequest(createAbsensiSubAcaraSchema, imageSchema), upload.single("image"), CatchWrapper(createAbsensiSubAcaraController))
route.get("/acara", VerifyToken, CatchWrapper(getAbsensiController))

export default route