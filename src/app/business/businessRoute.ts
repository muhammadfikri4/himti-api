import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { VerifyToken } from "../../middleware/verifyToken"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { imageSchema } from "../global/imageRequest"
import { upload } from "./businessConfig"
import { createMerchandiseController, createServiceController } from "./businessController"
import { createBusinessSchema } from "./businessRequest"

const route = Router()

route.post("/merchandise", VerifyToken, upload.single("image"), validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createMerchandiseController))
route.post("/service", VerifyToken, upload.single("image"), validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createServiceController))

export default route