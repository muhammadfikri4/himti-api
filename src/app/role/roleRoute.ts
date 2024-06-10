import { Router } from "express";
import { createRoleController } from "./roleController";

const route = Router()

route.post("/", createRoleController)

route.get("/")

export default route