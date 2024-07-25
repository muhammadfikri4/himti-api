import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { VerifyToken } from "../../middleware/verifyToken"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { getProfileController, updateProfileController } from "./profileController"
import { updateProfileSchema } from "./profileRequest"

const route = Router()

route.get("/", VerifyToken, getProfileController)
route.put('/', VerifyToken, validateRequest(updateProfileSchema), CatchWrapper(updateProfileController))

export default route