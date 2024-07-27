import { decode } from "jsonwebtoken"
import { TokenDecodeInterface } from "../../interface"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { AnggotaSosmedDTO } from "../anggota/anggotaDTO"
import { getAnggotaById, updateSosmedAnggota } from "../anggota/anggotaRepository"
import { getUserById } from "../authentication/authRepository"
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO"
import { getProfile, updateProfile } from "./profileRepository"

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

    const { email, id, name, nim, role, updatedAt, createdAt } = profile
    const response = {
        id,
        email,
        name,
        nim,
        role,
        ...sosmed,
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

    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (!user?.anggotaId && sosmed) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ANGGOTA, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const profileField: Partial<ProfileDTO> = { id };

    if (name !== undefined) profileField.name = name;
    if (email !== undefined) profileField.email = email;
    if (nim !== undefined) profileField.nim = nim.toString();

    const sosmedField: Partial<AnggotaSosmedDTO> = { id: user.anggotaId as string }
    if (instagram !== undefined) sosmedField.instagram = instagram;
    if (twitter !== undefined) sosmedField.twitter = twitter;
    if (linkedin !== undefined) sosmedField.linkedin = linkedin;
    if (facebook !== undefined) sosmedField.facebook = facebook;

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

export const changePasswordService = async (token: string, { newPassword }: ChangePasswordDTO) => {
    const decodeToken = decode(token) as TokenDecodeInterface
    const id = decodeToken.id
    const user = await getUserById(id)
    if (!user) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }


    const profileField: Partial<ChangePasswordDTO> = { id };

    const response = await updateProfile(profileField as ProfileDTO)
    return response
}