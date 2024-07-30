
export interface SubAcaraModelTypes {
    id?: string
    name?: string
    description?: string,
    acaraId?: string
    image?: string,
    isOpen?: boolean,
    isOpenAbsen?: boolean
    startTime?: Date,
    endTime?: Date
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterSubAcara {
    search?: string,
    acaraId?: string
    page?: number,
    perPage?: number
}