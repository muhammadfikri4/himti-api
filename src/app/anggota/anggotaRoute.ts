import { Router } from "express";
import { createAnggotaController, deleteAnggotaController, getAnggotaController, updateAnggotaController } from "./anggotaController";

const route = Router()

route.post("/", createAnggotaController)
route.get("/", getAnggotaController)
route.delete("/:id", deleteAnggotaController)
route.put("/:id", updateAnggotaController)

export default route