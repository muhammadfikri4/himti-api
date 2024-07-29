export interface AbsensiDTO {
    userId?: string
    acaraId?: string
    subAcaraId?: string
    image: string,
    coordinate: string
    address?: string
}

export interface TokenTypes {
    id: string
}

export interface IFilterAbsensi {
    userId?: string
    acaraId?: string
    subAcaraId?: string
    page?: number
    perPage?: number
}