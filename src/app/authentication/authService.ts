import { Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt, { decode } from 'jsonwebtoken'
import { TokenDecodeInterface } from '../../interface'
import { environment } from '../../libs'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { random } from '../../utils/GeneratedRandomOTP'
import { ErrorApp } from '../../utils/HttpError'
import { SendEmail } from '../../utils/MailerConfig'
import { MESSAGES } from '../../utils/Messages'
import { getAnggotaByNIM } from '../anggota/anggotaRepository'
import { LoginAuthBodyDTO, RegisterAuthBodyDTO, ValidateOtpDTO } from './authDTO'
import { createOtp, createUser, getOtp, getUserByEmail, getUserById, getUserByNIM, verifiedOtp } from './authRepository'

dotenv.config()

export const registerService = async ({ email, name, password, nim, code }: RegisterAuthBodyDTO) => {

    const user = await getUserByEmail(email)
    if (user) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.USER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    let role: Role = "USER"
    let anggotaId = null

    const isAnggota = await getAnggotaByNIM(nim)
    const alreadyUser = await getUserByNIM(nim)

    if (isAnggota && !code) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.CODE_ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (isAnggota && code && code !== environment.ANGGOTA_CODE) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.CODE_ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST)

    }

    if (!isAnggota && code) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.CODE_USER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (nim) {
        if (nim === isAnggota?.nim) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.NIM, 400, MESSAGE_CODE.BAD_REQUEST)
        }
        if (nim === alreadyUser?.nim) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.NIM, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }

    if (email) {
        if (email === isAnggota?.email) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
        }
        if (email === alreadyUser?.email) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }

    if (isAnggota && code === environment.ANGGOTA_CODE) {
        role = "ANGGOTA"
        anggotaId = isAnggota.id
    }
    const response = await createUser({ email, name, password: hashPassword, role, nim, anggotaId: anggotaId as string })
    return response

}

export const loginService = async (
    { email, password }: LoginAuthBodyDTO
) => {

    const user = await getUserByEmail(email)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    const token = jwt.sign({
        id: user.id,
    }, environment.JWT_SECRET as string, { expiresIn: '3d' })

    const userInfo = {
        name: user.name,
        nim: user.nim,
        role: user.role,
    }

    return { access_token: token, user: userInfo }

}

export const loginAdminService = async ({ email, password }: LoginAuthBodyDTO) => {
    const user = await getUserByEmail(email)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    if (user.role !== 'ADMIN') {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ROLE_ADMIN, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    const token = jwt.sign({
        id: user.id,
    }, environment.JWT_SECRET as string, { expiresIn: '3d' })

    return { access_token: token }
}

export const requestOtpService = async (token: string) => {

    const decodeToken = decode(token) as TokenDecodeInterface
    const id = decodeToken?.id
    const user = await getUserById(id)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const otp = await createOtp(random)
    await SendEmail(user.email, user.name, random)

    const data = {
        id: otp.id,
        otp: otp.otp,
        isVerified: otp.isVerified
    }
    return data
}

export const validateOtpService = async ({ id, otp }: ValidateOtpDTO) => {

    const findOtp = await getOtp(id)

    if (!findOtp) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.OTP_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (otp !== findOtp.otp) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.OTP_NUMBER, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const verified = await verifiedOtp(id)

    const data = {
        id: verified.id,
        isVerified: verified.isVerified
    }
    return data
}