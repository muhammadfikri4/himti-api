
export interface DosenModelTypes {
    _id: string
    nidn: number,
    name: string,
    email: string,
    numberPhone: number,
    mataKuliah?: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface SearchDosenTypes {
    name?: string,
    email?: string,
    nidn?: number,
    page?: number,
    perPage?: number
    totalData?: number,
    totalPage?: number
}