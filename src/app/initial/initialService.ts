import { Role } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createUser, getAllUsersCount } from "../user/userRepository"

interface InitalRequest {
    name: string
    email: string
}

export const initialService = async ({ email, name }: InitalRequest) => {

    const users = await getAllUsersCount()

    if (users > 0) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.INITIAL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const password = await bcrypt.hash(atob("U1VQRVJBRE1JTjEyMw=="), 10)
    const initialUserData = {
        email,
        name,
        password,
        role: 'SUPER_ADMIN' as Role

    }
    const user = await createUser(initialUserData)
    return user
}