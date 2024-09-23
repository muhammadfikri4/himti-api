import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { VerifyToken } from "../../middleware/verifyToken";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { createMemberController, deleteMemberController, getMemberByIdController, getMemberController, updateMemberController } from "./membersController";
import { createMemberSchema } from "./membersRequest";

const route = Router()

route.post("/", VerifyToken, validateRequest(createMemberSchema), CatchWrapper(createMemberController))
route.get("/", VerifyToken, CatchWrapper(getMemberController))
route.get("/:id", VerifyToken, CatchWrapper(getMemberByIdController))
route.delete("/:id", CatchWrapper(deleteMemberController))
route.put("/:id", CatchWrapper(updateMemberController))

export default route