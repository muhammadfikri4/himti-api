import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { upload } from "./absensiConfig";
import { createAbsensiController, getAbsensiController } from "./absensiController";

const route = Router()

route.post("/", VerifyToken, upload.single("image"), createAbsensiController)
route.get("/", VerifyToken, getAbsensiController)

export default route