import { prisma } from "../../config"

export const getProfile = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}