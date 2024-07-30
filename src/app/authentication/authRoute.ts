import { Router } from "express";
import { VerifyToken } from "middleware/verifyToken";
import { validateRequest } from "../../middleware/validateRequest";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { loginAdminController, loginController, registerController, requestOtpController, validateOtpController } from "./authController";
import { loginSchema, registerSchema, requestOtpSchema, validateOtpSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), CatchWrapper(registerController))
route.post("/login", validateRequest(loginSchema), CatchWrapper(loginController))
route.post("/admin/login", validateRequest(loginSchema), CatchWrapper(loginAdminController))
route.post('/otp', VerifyToken, validateRequest(requestOtpSchema), CatchWrapper(requestOtpController))
route.post('/otp/validate', VerifyToken, validateRequest(validateOtpSchema), CatchWrapper(validateOtpController))

export default route