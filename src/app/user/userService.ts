import { Meta } from "utils/Meta"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { IFilterUser } from "./userDTO"
import { getUsers, getUsersCount } from "./userRepository"



export const getUsersService = async ({ page = 1, perPage = 10, search, role }: IFilterUser) => {

    const [users, totalData] = await Promise.all([getUsers({ page, perPage, search, role }), getUsersCount({ search })])
    const meta = Meta(page, perPage, totalData)
    if (!users.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: users, meta }
}