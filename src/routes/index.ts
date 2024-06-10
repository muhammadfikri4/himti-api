import { Router, type Request, type Response } from "express";
import angkatanRoute from '../app/angkatan/angkatanRoute';
import authRoute from '../app/authentication/authRoute';
import dosenRoute from '../app/dosen/dosenRoute';
import roleRoute from '../app/role/roleRoute';

const route = Router();

route.use("/auth", authRoute);
route.use("/role", roleRoute);
route.use("/angkatan", angkatanRoute)
route.use("/dosen", dosenRoute)


route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route