import { Router, type Request, type Response } from "express";
import acaraRoute from '../app/acara/acaraRoute';
import anggotaRoute from '../app/anggota/anggotaRoute';
import angkatanRoute from '../app/angkatan/angkatanRoute';
import authRoute from '../app/authentication/authRoute';
import dosenRoute from '../app/dosen/dosenRoute';

const route = Router();

route.use("/auth", authRoute);
// route.use("/role", roleRoute);
route.use("/angkatan", angkatanRoute)
route.use("/dosen", dosenRoute)
// route.use("/struktural", strukturalRoute)
route.use("/anggota", anggotaRoute)
// route.use("/alumni", alumniRoute)
route.use("/acara", acaraRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

export default route