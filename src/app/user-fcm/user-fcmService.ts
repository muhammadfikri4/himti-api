import { ErrorApp } from "utils/HttpError";
import { Meta } from "../../utils/Meta";
import { getAllFCMUser, getAllFCMUserCount, getFCMUserById, getUserFCMByUserId } from "./user-fcm.repository";
import { UserFCMQuery } from "./user-fcmDTO";
import { userFCMDTOMapper } from "./user-fcmMapper";
import { MESSAGES } from "utils/Messages";
import { MESSAGE_CODE } from "utils/ErrorCode";

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

export const deleteUserFCMUserService = async(userFcmId:string) => {
    const userFCM = await getFCMUserById(userFcmId) 

    if(!userFCM) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.FCM, 404, MESSAGE_CODE.NOT_FOUND)
    }
}