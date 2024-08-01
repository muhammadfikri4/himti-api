
export interface AnggotaModelTypes {
    id: string
    nim: string
    name: string,
    email?: string | null,
    angkatanId?: string,
    angkatan: {
        id: string
        year: string
        isActive: boolean
    }
    instagram?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    isActive: boolean,
    createdAt: Date
    updatedAt: Date
}

export interface IFilterAnggota {
    year?: string
    search?: string
    page?: number,
    perPage?: number
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