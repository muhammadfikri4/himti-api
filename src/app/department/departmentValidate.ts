
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { DosenBodyDTO } from "./departmentDTO"
import { getDosenByEmail, getDosenByNIDN } from "./departmentRepository"

export const dosenValidate = async ({ nidn, name, email }: DosenBodyDTO) => {
    if (!nidn) {
        return AppError(MESSAGES.ERROR.REQUIRED.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!REGEX.email.test(email as string)) {
        return AppError(MESSAGES.ERROR.INVALID.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchNIDN = await getDosenByNIDN(nidn)
    if (matchNIDN) {
        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.NIDN, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const matchEmail = await getDosenByEmail(email as string)
    if (matchEmail) {
        return AppError(MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}