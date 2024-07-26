import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { loginController, registerController } from "./authController";
import { loginSchema, registerSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), CatchWrapper(registerController))
route.post("/login", validateRequest(loginSchema), CatchWrapper(loginController))

export default route