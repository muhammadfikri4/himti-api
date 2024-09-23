import { Role, User, UserFCM } from "@prisma/client";
import { UserFCMDTO } from "./user-fcmDTO";

interface UserFCMData extends UserFCM {
    User: User
}

export const userFCMDTOMapper = (data: UserFCMData[]): UserFCMDTO[] => {
    return data.map(item => ({
        id: item.id,
        user: {
            id: item.User.id,
            name: item.User.name,
            role: item.User.role as Role
        }
    }))
}