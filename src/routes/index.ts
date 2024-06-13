import { Router, type Request, type Response } from "express";
import anggotaRoute from '../app/anggota/anggotaRoute';
import angkatanRoute from '../app/angkatan/angkatanRoute';
import authRoute from '../app/authentication/authRoute';
import dosenRoute from '../app/dosen/dosenRoute';
import roleRoute from '../app/role/roleRoute';
import strukturalRoute from '../app/struktural/strukturalRoute';

const route = Router();

route.use("/auth", authRoute);
route.use("/role", roleRoute);
route.use("/angkatan", angkatanRoute)
route.use("/dosen", dosenRoute)
route.use("/struktural", strukturalRoute)
route.use("/anggota", anggotaRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route