import { Router } from "express";
import { initialController } from "./initialController";

const route = Router()

route.post("/", initialController)

export default route