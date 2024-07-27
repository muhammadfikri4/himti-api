export interface ProfileDTO {
    id?: string
    email: string
    name: string
    nim: string
    instagram?: string
    facebook?: string
    twitter?: string
    linkedin?: string
}

export interface ChangePasswordDTO {
    id?: string
    oldPassword: string
    newPassword: string
}