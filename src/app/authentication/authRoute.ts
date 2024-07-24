import { Router } from "express";
import { validateRequest } from "middleware/validateRequest";
import { loginController, registerController } from "./authController";
import { loginSchema, registerSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), registerController)
route.post("/login", validateRequest(loginSchema), loginController)

export default route