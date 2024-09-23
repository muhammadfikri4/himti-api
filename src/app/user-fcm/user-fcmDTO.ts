import { Role } from "@prisma/client"

export interface UserFCMQuery {
    page?: number
    perPage?: number
}

export interface UserFCMDTO {
    id: string
    user: {
        id: string
        name: string
        role: Role
    }
}