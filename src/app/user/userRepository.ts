import { Prisma } from "@prisma/client"
import { prisma } from "../../config"
import { ReturnValue } from "../../utils/ReturnValue"
import { IFilterUser, UpdateUserBodyRequest, UserRequestBodyDTO } from "./userDTO"

// export const createAbsensi = async ({ acaraId, image, userId, coordinate }: AbsensiDTO) => {
//     return await prisma.absensi.create({
//         data: {
//             image,
//             acaraId,
//             userId: userId as string,
//             coordinate
//         }
//     })
// }

export const getAbsensiByUserId = async (userId: string) => {
    return await prisma.absensi.findMany({
        where: {
            userId
        },
        include: {
            acara: {
                select: {
                    id: true,
                    name: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    nim: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getUsers = async ({ page, perPage, search, role }: IFilterUser) => {
    const filter = {} as { OR: Prisma.UserWhereInput[] }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                role
            }


        ]
    }

    return await prisma.user.findMany({
        where: filter,
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            nim: true,
            role: true,
            isLogin: true
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getUsersCount = async ({ search }: IFilterUser) => {
    const filter = {} as { OR: Prisma.UserWhereInput[] }

    if (search) {
        filter.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                },
            },
            {
                nim: {
                    contains: search,
                    mode: 'insensitive'
                },
            },



        ]
    }

    return await prisma.user.count({
        where: filter,


    })
}

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            nim: true,
            anggotaId: true,
            role: true
        }
    })
}

export const createUser = async (data: UserRequestBodyDTO) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        },
        select: {
            id: true,
            name: true
        }
    })
}

export const updateUser = async (userId: string, data: UpdateUserBodyRequest) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name: ReturnValue<string>(data.name as string),
            email: ReturnValue<string>(data.email as string),
        },
        select: {
            id: true,
        }
    })
}

export const getAllUsers = async () => {
    return await prisma.user.findMany()
}

export const getAllUsersCount = async () => {
    return await prisma.user.count()
}