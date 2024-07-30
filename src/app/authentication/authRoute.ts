import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { forgotPassword, loginAdminController, loginController, registerController } from "./authController";
import { loginSchema, registerSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), CatchWrapper(registerController))
route.post("/login", validateRequest(loginSchema), CatchWrapper(loginController))
route.post("/admin/login", validateRequest(loginSchema), CatchWrapper(loginAdminController))
route.post('/forgot-password', forgotPassword)

export default route