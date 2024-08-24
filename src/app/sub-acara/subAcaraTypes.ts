
export interface SubAcaraModelTypes {
    id?: string
    name?: string
    description?: string,
    acaraId?: string
    image?: string,
    startTime?: Date | string,
    endTime?: Date | string
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterSubAcara {
    search?: string,
    acaraId?: string
    page?: number,
    perPage?: number
}