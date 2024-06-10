import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { UserModel } from '../../config/model/user'
import { ENV } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { REGEX } from '../../utils/Regex'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO } from './authDTO'

dotenv.config()

export const registerService = async ({ email, name, password }: RegisterAuthBodyDTO) => {

    if (!REGEX.email.test(email)) {
        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const user = await UserModel.findOne({ email })
    if (user) {
        return AppError(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (password.length < 8) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({ name, email, password: hashPassword })
    return newUser

}

export const loginService = async (
    { email, password }: LoginAuthBodyDTO
) => {

    const user = await UserModel.findOne({ email })
    if (!user) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return AppError(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, ENV.JWT_SECRET as string)

    return token

}