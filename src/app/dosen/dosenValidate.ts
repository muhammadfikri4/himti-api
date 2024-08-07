
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { REGEX } from "../../utils/Regex"
import { DosenBodyDTO } from "./dosenDTO"
import { getDosenByEmail, getDosenByNIDN } from "./dosenRepository"

export const dosenValidate = async ({ nidn, name, email }: DosenBodyDTO) => {
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