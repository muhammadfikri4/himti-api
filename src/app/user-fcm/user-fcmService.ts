import { Meta } from "../../utils/Meta";
import { getAllFCMUser, getAllFCMUserCount } from "./user-fcm.repository";
import { UserFCMQuery } from "./user-fcmDTO";
import { userFCMDTOMapper } from "./user-fcmMapper";

export const getAllFCMUserService = async (query: UserFCMQuery) => {
    const { page = '1', perPage = '10' } = query
    const [fcmUser, totalData] = await Promise.all([
        getAllFCMUser(Number(page), Number(perPage)),
        getAllFCMUserCount()
    ])

    const data = userFCMDTOMapper(fcmUser)
    const meta = Meta(Number(page), Number(perPage), totalData)
    return { data, meta }
}