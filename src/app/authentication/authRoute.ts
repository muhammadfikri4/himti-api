import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { forgotPasswordController, loginAdminController, loginController, registerController, requestOtpController, validateOtpController } from "./authController";
import { forgotPasswordSchema, loginSchema, registerSchema, requestOtpSchema, validateOtpSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), CatchWrapper(registerController))
route.post("/login", validateRequest(loginSchema), CatchWrapper(loginController))
route.post("/admin/login", validateRequest(loginSchema), CatchWrapper(loginAdminController))
route.post('/otp', validateRequest(requestOtpSchema), CatchWrapper(requestOtpController))
route.post('/otp/validate', validateRequest(validateOtpSchema), CatchWrapper(validateOtpController))
route.put('/forgot-password', validateRequest(forgotPasswordSchema), CatchWrapper(forgotPasswordController))

export default route