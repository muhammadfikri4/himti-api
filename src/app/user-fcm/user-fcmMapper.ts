import { Role, User, UserFCM } from "@prisma/client";
import { UserFCMDTO } from "./user-fcmDTO";

interface UserFCMData extends UserFCM {
    user: User
}

export const userFCMDTOMapper = (data: UserFCMData[]): UserFCMDTO[] => {
    return data.map(item => ({
        id: item.id,
        user: {
            id: item.user.id,
            name: item.user.name,
            role: item.user.role as Role
        }
    }))
}