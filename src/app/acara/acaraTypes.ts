
export interface AcaraModelTypes {
    id?: string
    name?: string
    description?: string,
    image?: string,
    isOpen?: boolean,
    startTime?: Date,
    endTime?: Date
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterAcara {
    name?: string,
    page?: number,
    perPage?: number
}