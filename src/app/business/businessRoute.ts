import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { VerifyToken } from "../../middleware/verifyToken"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { imageSchema } from "../global/imageRequest"
import { upload } from "./businessConfig"
import { createMerchandiseController } from "./businessController"
import { createBusinessSchema } from "./businessRequest"

const route = Router()

route.post("/merchandise", VerifyToken, upload.single("image"), validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createMerchandiseController))

export default route