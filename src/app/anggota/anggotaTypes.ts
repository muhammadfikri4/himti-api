
export interface AnggotaModelTypes {
    id: string
    nim: string
    name: string,
    email?: string | null,
    angkatanId?: string,
    angkatan: {
        id: string
        year: number
        isActive: boolean
    }
    isActive: boolean,
    createdAt: Date
    updatedAt: Date
}

export interface IFilterAnggota {
    name?: string,
    email?: string,
    nim?: number,
    page?: number,
    perPage?: number
    totalData?: number,
    totalPage?: number
}

export interface AnggotaResponseTypes {
    id: string
    nim: number
    name: string,
    email: string,
    angkatan: {
        id: string
        year: number
        isActive: boolean
    }

    isActive: boolean,
    createdAt: Date
    updatedAt: Date
}