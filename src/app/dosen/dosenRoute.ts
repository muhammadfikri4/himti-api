import { Router } from "express";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createDosenController, deleteDosenController, getDosenController, updateDosenController } from "./dosenController";

const route = Router()

route.post("/", createDosenController)
route.get("/", CatchWrapper(getDosenController))
route.delete("/:id", CatchWrapper(deleteDosenController))
route.put("/:id", CatchWrapper(updateDosenController))

export default route