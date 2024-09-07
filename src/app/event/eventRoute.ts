import { Router } from "express";
import { upload as UploadFile } from "../../utils/UploadFileToStorage";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createEventController, deleteEventController, getEventController, getDetailEventController, updateEventController } from "./eventController";

const route = Router()

route.post("/", VerifyToken, CatchWrapper(UploadFile.single('image')), CatchWrapper(createEventController))
route.get("/", CatchWrapper(getEventController))
route.delete("/:id", VerifyToken, CatchWrapper(deleteEventController))
route.put("/:id", VerifyToken, CatchWrapper(UploadFile.single("image")), CatchWrapper(updateEventController))
route.get("/:id", CatchWrapper(getDetailEventController))

export default route