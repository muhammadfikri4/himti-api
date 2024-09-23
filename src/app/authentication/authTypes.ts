export type Role = "super admin" | "admin" | "user"

export interface UserModelTypes {
    id: string
    name: string,
    email: string,
    password: string,
    role: Role
}