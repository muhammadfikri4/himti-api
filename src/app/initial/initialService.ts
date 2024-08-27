import { Role } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { createUser, getAllUsersCount } from "../user/userRepository"
import { createVersion, getVersion } from "../version/versionRepository"

interface InitalRequest {
    name: string
    email: string
}

export const initialService = async ({ email, name }: InitalRequest) => {

    const users = await getAllUsersCount()
    const version = await getVersion()

    if (!users || !version) {
        if (!version) {
            await createVersion(
                '1.0.0',
                '1.0.0',
                'https://play.google.com/store/apps/details?id=or.id.himtiumt.himtiapp',
                undefined,
                'Initial Version'
            )
        }
        if (users < 1) {
            const password = await bcrypt.hash(atob("U1VQRVJBRE1JTjEyMw=="), 10)
            const initialUserData = {
                email,
                name,
                password,
                role: 'SUPER_ADMIN' as Role

            }
            await createUser(initialUserData)
        }
        return true
    }

    let message = ''
    if (users > 0 || version) {
        if (users > 0) {
            message = MESSAGES.ERROR.ALREADY.INITIAL
            return
        }
        if (version) {
            message = MESSAGES.ERROR.ALREADY.INITIAL_VERSION
            return
        }
    }


    return new ErrorApp(message, 400, MESSAGE_CODE.BAD_REQUEST)
}