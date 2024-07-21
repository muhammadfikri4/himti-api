import { Router } from "express"
import { VerifyToken } from "../../middleware/verifyToken"
import { getProfileController } from "./profileController"

const route = Router()

route.get("/", VerifyToken, getProfileController)

export default route