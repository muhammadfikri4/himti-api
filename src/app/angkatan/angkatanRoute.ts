import { Router } from "express";
import { createAngkatanController } from "./angkatanController";

const route = Router()

route.post("/", createAngkatanController)

route.get("/")

export default route