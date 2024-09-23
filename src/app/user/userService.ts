import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { Meta } from "../../utils/Meta"
import { getUserById } from '../authentication/authRepository'
import { IFilterUser, UpdateUserBodyRequest, UserRequestBodyDTO } from "./userDTO"
import { userDTOMapper } from './userMapper'
import { createUser, getUserByEmail, getUsers, getUsersCount, updateUser } from "./userRepository"



export const getUsersService = async ({ page = 1, perPage = 10, search, role }: IFilterUser) => {

    const [users, totalData] = await Promise.all([getUsers({ page, perPage, search, role }), getUsersCount({ search })])
    const meta = Meta(page, perPage, totalData)
    if (!users.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: users, meta }
}

export const createUserService = async (body: UserRequestBodyDTO) => {
    const existUser = await getUserByEmail(body.email)
    if (existUser) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(body.password, 10)

    const user = await createUser({ ...body, role: 'ADMIN', password: hashPassword })
    return user

}

export const getUserService = async (userId: string) => {

    const user = await getUserById(userId)

    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const data = userDTOMapper(user as User)
    return data
}

export const updateUserService = async (userId: string, data: UpdateUserBodyRequest) => {

    const user = await getUserById(userId)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const result = await updateUser(userId, data)
    return result

}