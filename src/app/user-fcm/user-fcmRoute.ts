import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { getAllFCMUserController } from "./user-fcmController";

const route = Router()

route.get("/", CatchWrapper(getAllFCMUserController))

export default route
