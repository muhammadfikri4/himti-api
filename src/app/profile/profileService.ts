import bcrypt from 'bcrypt'
import { decode } from "jsonwebtoken"
import { TokenDecodeInterface } from "../../interface"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { AnggotaSosmedDTO } from "../anggota/anggotaDTO"
import { getAnggotaById, getAnggotaByNIM, updateSosmedAnggota } from "../anggota/anggotaRepository"
import { getUserByEmail, getUserById, getUserByNIM } from "../authentication/authRepository"
import { getPointByUserId } from '../point/pointRepository'
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO"
import { getProfile, updatePassword, updateProfile } from "./profileRepository"

export const getProfileService = async (token: string) => {
    const decodeToken = decode(token)
    if (!(decodeToken as ProfileDTO)?.id) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER_ID, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const profile = await getProfile((decodeToken as ProfileDTO)?.id as string)
    if (!profile) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    let anggota
    if (profile.anggotaId) {
        anggota = await getAnggotaById(profile.anggotaId)

    }

    const sosmed = {
        instagram: anggota?.instagram,
        linkedin: anggota?.linkedin,
        twitter: anggota?.twitter,
        facebook: anggota?.facebook,
    }

    const point = await getPointByUserId((decodeToken as TokenDecodeInterface).id)
    const { email, id, name, nim, role, updatedAt, createdAt } = profile
    const response = {
        id,
        email,
        name,
        nim,
        role,
        ...sosmed,
        totalPoint: point._sum.point,
        createdAt,
        updatedAt
    }

    return response
}

export const updateProfileService = async (token: string, { email, name, nim, facebook, instagram, twitter, linkedin }: ProfileDTO) => {

    const decodeToken = decode(token) as TokenDecodeInterface
    const id = decodeToken.id
    const sosmed = facebook || instagram || twitter || linkedin

    const user = await getUserById(id)
    console.log(nim)

    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (!user?.anggotaId && sosmed) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (nim && user.anggotaId && user.role === 'ANGGOTA') {
        return new ErrorApp(MESSAGES.ERROR.INVALID.NIM_ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!user.anggotaId) {
        const getNIMAnggota = nim ? await getAnggotaByNIM(nim) : null;
        if (getNIMAnggota) {
            return new ErrorApp(MESSAGES.ERROR.ALREADY.USER_NIM, 400, MESSAGE_CODE.BAD_REQUEST)
        }
        if (nim && nim.length >= 14) {
            return new ErrorApp(MESSAGES.ERROR.INVALID.NIM.LENGTH, 400, MESSAGE_CODE.BAD_REQUEST)
        }
    }

    const getNIM = nim ? await getUserByNIM(nim) : null
    if (getNIM && getNIM.id !== user.id && !user.anggotaId && user.role === 'USER') {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.NIM, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const getEmail = await getUserByEmail(email as string)
    if (getEmail && getEmail.id !== id) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const profileField: Partial<ProfileDTO> = { id };

    if (name) profileField.name = name;
    if (email) profileField.email = email;
    if (nim) profileField.nim = nim

    const sosmedField: Partial<AnggotaSosmedDTO> = { id: user.anggotaId as string }
    if (instagram) sosmedField.instagram = instagram;
    if (twitter) sosmedField.twitter = twitter;
    if (linkedin) sosmedField.linkedin = linkedin;
    if (facebook) sosmedField.facebook = facebook;

    if (!user.anggotaId) {

        const response = await updateProfile(profileField as ProfileDTO)
        return response
    }
    const [profile, anggota] = await Promise.all([updateProfile(profileField as ProfileDTO), updateSosmedAnggota(sosmedField as AnggotaSosmedDTO)])
    const { password, ...rest } = profile
    const sosmedAnggota = {
        instagram: anggota?.instagram,
        linkedin: anggota?.linkedin,
        twitter: anggota?.twitter,
        facebook: anggota?.facebook,
    }
    return { ...rest, ...sosmedAnggota }

}

export const updatePasswordService = async (token: string, { newPassword, oldPassword, }: ChangePasswordDTO) => {
    const decodeToken = decode(token) as TokenDecodeInterface
    const id = decodeToken.id
    const user = await getUserById(id)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
    console.log(user)
    const match = await bcrypt.compare(oldPassword as string, user.password)
    console.log({ match })
    if (!match) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.USER.PASSWORD, 401, MESSAGE_CODE.UNAUTHORIZED)
    }

    if (oldPassword === newPassword) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.NEW_PASSWORD, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)

    const response = await updatePassword({ newPassword: hashPassword, id })
    return response
}