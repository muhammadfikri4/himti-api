import { prisma } from "config"
import { RegisterAuthBodyDTO } from "./authDTO"

export const createUser = async ({ email, name, password }: RegisterAuthBodyDTO) => {
    return await prisma.user.create({
        data: {
            email,
            name,
            password,
            role: 'ADMIN'
        }
    })
}

export const findUser = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}