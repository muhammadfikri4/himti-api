
export interface AcaraModelTypes {
    id?: string
    name?: string
    description?: string,
    image?: string,
    isOpen?: boolean,
    isOpenAbsen?: boolean,
    startTime?: Date,
    endTime?: Date
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterEvent {
    search?: string,
    status?: string
    page?: number,
    perPage?: number
    openRegister?: string | boolean
}