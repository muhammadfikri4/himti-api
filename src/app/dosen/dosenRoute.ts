import { Router } from "express";
import { createDosenController, deleteDosenController, getDosenController, updateDosenController } from "./dosenController";

const route = Router()

route.post("/", createDosenController)
route.get("/", getDosenController)
route.delete("/:id", deleteDosenController)
route.put("/:id", updateDosenController)

export default route