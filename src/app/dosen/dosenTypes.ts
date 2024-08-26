
export interface DosenModelTypes {
    id: string
    nidn: string | number,
    name: string,
    email?: string,
    numberPhone?: number,
    mataKuliah?: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterDosen {
    search?: string
    page?: number
    perPage?: number
}