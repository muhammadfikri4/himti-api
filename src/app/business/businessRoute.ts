import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { imageSchema } from "../global/imageRequest"
import { createMerchandiseController } from "./businessController"
import { createBusinessSchema } from "./businessRequest"

const route = Router()

route.post("/merchandise", validateRequest(createBusinessSchema, imageSchema), CatchWrapper(createMerchandiseController))

export default route