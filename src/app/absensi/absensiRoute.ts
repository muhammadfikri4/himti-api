import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { imageSchema } from "../global/imageRequest";
import { upload } from "./absensiConfig";
import { createAbsensiAcaraController, createAbsensiSubAcaraController, getAbsensiByIdController, getAbsensiController, getAbsensiesController } from "./absensiController";
import { createAbsensiAcaraSchema, createAbsensiSubAcaraSchema } from "./absensiRequest";

const route = Router()

route.post("/acara", VerifyToken, validateRequest(createAbsensiAcaraSchema, imageSchema), upload.single("image"), CatchWrapper(createAbsensiAcaraController))
route.post("/sub-acara", VerifyToken, CatchWrapper(upload.single('image')), validateRequest(createAbsensiSubAcaraSchema, imageSchema), CatchWrapper(createAbsensiSubAcaraController))
route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/:subAcaraId', VerifyAdmin, CatchWrapper(getAbsensiesController))
route.get("/:id", VerifyToken, CatchWrapper(getAbsensiByIdController))

export default route