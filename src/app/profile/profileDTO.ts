export interface ProfileDTO {
    id?: string
    email: string
    name: string
    nim: string
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string,
    point: number
}

export interface ChangePasswordDTO {
    id?: string
    oldPassword?: string
    newPassword: string
}