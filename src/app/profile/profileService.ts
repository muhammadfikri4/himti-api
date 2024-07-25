import { decode } from "jsonwebtoken"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { ProfileDTO } from "./profileDTO"
import { getProfile } from "./profileRepository"

export const getProfileService = async (token: string) => {
    const decodeToken = decode(token)
    if (!(decodeToken as ProfileDTO)?.id) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER_ID, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const profile = await getProfile((decodeToken as ProfileDTO)?.id as string)
    if (!profile) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const { email, id, name, nim, role, updatedAt, createdAt } = profile
    const response = {
        id,
        email,
        name,
        nim,
        role,
        createdAt,
        updatedAt
    }

    return response
}

// export const updateProfileService = (token: string) => {
//     const updateFields: Partial<AnggotaBodyDTO> = {};

//     if (name !== undefined) updateFields.name = name;
//     if (isActive !== undefined) updateFields.isActive = isActive;
//     if (email !== undefined) updateFields.email = email;
//     if (angkatanId !== undefined) updateFields.angkatanId = angkatanId;
//     if (nim !== undefined) updateFields.nim = nim.toString();

//     const anggota = await updateAnggota(updateFields)
// }