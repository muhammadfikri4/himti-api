import { Router, type Request, type Response } from "express";
import absensiRoute from '../app/absensi/absensiRoute';
import acaraRoute from '../app/acara/acaraRoute';
import anggotaRoute from '../app/anggota/anggotaRoute';
import angkatanRoute from '../app/angkatan/angkatanRoute';
import authRoute from '../app/authentication/authRoute';
import businessRoute from '../app/business/businessRoute';
import dosenRoute from '../app/dosen/dosenRoute';
import profileRoute from '../app/profile/profileRoute';
import strukturalRoute from '../app/struktural/strukturalRoute';
import subAcaraRoute from '../app/sub-acara/subAcaraRoute';
import userRoute from '../app/user/userRoute';
import { MESSAGES } from "../utils/Messages";

const route = Router();

route.use("/auth", authRoute);
route.use("/profile", profileRoute);
route.use("/absensi", absensiRoute);
route.use("/angkatan", angkatanRoute)
route.use("/dosen", dosenRoute)
route.use("/struktural", strukturalRoute)
route.use("/anggota", anggotaRoute)
route.use("/acara", acaraRoute)
route.use("/sub-acara", subAcaraRoute)
route.use('/business', businessRoute)
route.use('/user', userRoute)

route.get("/", (req: Request, res: Response) => {
    return res.json({ message: "Hello World 🚀" })
})

route.use("*", (req: Request, res: Response) => {
    return res.status(404).json({ message: MESSAGES.ERROR.NOT_FOUND.ROUTE })
})

export default route