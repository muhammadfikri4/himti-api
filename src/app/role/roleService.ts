// import dotenv from 'dotenv'
// import { RoleModel } from '../../config/model/role'
// import { MESSAGE_CODE } from '../../utils/ErrorCode'
// import { AppError } from '../../utils/HttpError'
// import { MESSAGES } from '../../utils/Messages'
// import { RoleBodyDTO } from './roleDTO'

// dotenv.config()

// export const createRoleService = async ({ name, isActive }: RoleBodyDTO) => {

//     const user = await RoleModel.findOne({ name })
//     if (user) {
//         return AppError(MESSAGES.ERROR.ALREADY.ROLE, 400, MESSAGE_CODE.BAD_REQUEST)
//     }

//     const role = await RoleModel.create({ name, isActive })
//     return role

// }
