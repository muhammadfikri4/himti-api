import { User } from "@prisma/client";
import { UserDTO } from "./userDTO";

export const userDTOMapper = (user: User): UserDTO => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    }
}