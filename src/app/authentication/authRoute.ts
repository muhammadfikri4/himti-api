import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyAdmin } from "../../middleware/verifyAdmin";
import { VerifySuperAdmin } from "../../middleware/verifySuperAdmin";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { checkToken, forgotPasswordController, loginAdminController, loginController, logoutController, registerController, requestOtpController, validateOtpController } from "./authController";
import { forgotPasswordSchema, loginSchema, registerSchema, requestOtpSchema, validateOtpSchema } from "./authRequest";

const route = Router()

route.post("/register", validateRequest(registerSchema), CatchWrapper(registerController))
route.post("/login", validateRequest(loginSchema), CatchWrapper(loginController))
route.post("/admin/login", VerifySuperAdmin, VerifyAdmin, validateRequest(loginSchema), CatchWrapper(loginAdminController))
route.post('/otp', validateRequest(requestOtpSchema), CatchWrapper(requestOtpController))
route.post('/otp/validate', validateRequest(validateOtpSchema), CatchWrapper(validateOtpController))
route.put('/forgot-password', validateRequest(forgotPasswordSchema), CatchWrapper(forgotPasswordController))
route.get('/logout', VerifyToken, CatchWrapper(logoutController))
route.get('/token', VerifyToken, CatchWrapper(checkToken))

export default route