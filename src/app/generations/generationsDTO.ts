export interface GenerationBodyDTO {
    id?: string
    year?: string
    isActive?: boolean
}

export interface IFilterGeneration {
    search?: string,
    status?: string,
    page?: number,
    perPage?: number
}
