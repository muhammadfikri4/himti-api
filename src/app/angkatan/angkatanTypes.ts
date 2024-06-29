
export interface AngkatanModelTypes {
    id: string
    year: number | string,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IFilterAngkatan {
    search?: string,
    page?: number,
    perPage?: number
}

