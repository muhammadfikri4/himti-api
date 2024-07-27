import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"
import { VerifyToken } from "../../middleware/verifyToken"
import { CatchWrapper } from "../../utils/CatchWrapper"
import { getProfileController, updatePasswordController, updateProfileController } from "./profileController"
import { updatePasswordSchema, updateProfileSchema } from "./profileRequest"

const route = Router()

route.get("/", VerifyToken, CatchWrapper(getProfileController))
route.put('/', VerifyToken, validateRequest(updateProfileSchema), CatchWrapper(updateProfileController))
route.put('/password', VerifyToken, validateRequest(updatePasswordSchema), CatchWrapper(updatePasswordController))

export default route