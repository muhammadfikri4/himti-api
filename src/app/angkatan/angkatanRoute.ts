import { Router } from "express";
import { createAngkatanController, deleteAngkatanController, getAngkatanController, updateAngkatanController } from "./angkatanController";

const route = Router()

route.post("/", createAngkatanController)
route.get("/", getAngkatanController)
route.delete("/:id", deleteAngkatanController)
route.put("/:id", updateAngkatanController)

export default route