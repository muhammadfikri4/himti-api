import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { VerifyToken } from "../../middleware/verifyToken"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { imageSchema } from "../global/imageRequest"
import { upload } from "./businessConfig"
import { createMerchandiseController, createServiceController, getMerchandiseController, getServiceController } from "./businessController"
import { createBusinessSchema } from "./businessRequest"

const route = Router()

// merchandise
route.get("/merchandise", CatchWrapper(getMerchandiseController))
route.post("/merchandise", VerifyToken, upload.single("image"), validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createMerchandiseController))

// service
route.get("/service", CatchWrapper(getServiceController))
route.post("/service", VerifyToken, upload.single("image"), validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createServiceController))

export default route