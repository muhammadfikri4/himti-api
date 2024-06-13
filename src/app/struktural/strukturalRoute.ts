import { Router } from "express";
import { upload } from "./strukturalConfig";
import { createStrukturalController, deleteStrukturalController, getStrukturalController, updateStrukturalController } from "./strukturalController";

// const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer({ dest: "./src/assets/images" });

const route = Router()

route.post("/", upload.single("image"), createStrukturalController)
// route.post("/", createStrukturalController)
route.get("/", getStrukturalController)
route.delete("/:id", deleteStrukturalController)
route.put("/:id", upload.single("image"), updateStrukturalController)

export default route