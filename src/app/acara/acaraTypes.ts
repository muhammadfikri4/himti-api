
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

export interface IFilterAcara {
    search?: string,
    page?: number,
    perPage?: number
    openAbsen?: string | boolean
    openRegister?: string | boolean
}