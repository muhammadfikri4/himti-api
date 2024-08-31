import { Router } from "express";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createAbsensiAcaraController, createAbsensiSubAcaraController, getAbsensiByIdController, getAbsensiController, getAbsensiesController } from "./absensiController";
import { upload } from "../../utils/UploadFileToStorage";

const route = Router()

route.post("/acara", VerifyToken, upload.single("image"), CatchWrapper(createAbsensiAcaraController))
route.post("/sub-acara", VerifyToken, CatchWrapper(upload.single('image')), CatchWrapper(createAbsensiSubAcaraController))
route.get("/", VerifyToken, CatchWrapper(getAbsensiController))
route.get('/sub-acara/:subAcaraId', VerifyAdmin, CatchWrapper(getAbsensiesController))
route.get("/:id", VerifyToken, CatchWrapper(getAbsensiByIdController))

export default route