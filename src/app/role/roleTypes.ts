export interface UserModelTypes {
    id: string
    name: string,
    email: string,
    password: string,
    role: "admin" | "user"
}