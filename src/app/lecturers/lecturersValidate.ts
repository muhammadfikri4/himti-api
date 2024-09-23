
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { LecturerBodyDTO } from "./lecturersDTO"
import { getDosenByEmail, getDosenByNIDN } from "./lecturersRepository"

export const createLecturerValidate = async ({ nidn, name, email }: LecturerBodyDTO) => {
    if (!nidn) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!name) {
        return new ErrorApp(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!REGEX.email.test(email as string)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIDN = await getDosenByNIDN(nidn)
    if (matchNIDN) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await getDosenByEmail(email as string)
    if (matchEmail) {
        return new ErrorApp(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}