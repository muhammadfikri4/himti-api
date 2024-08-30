export interface AbsensiDTO {
    userId?: string
    acaraId?: string
    subAcaraId?: string
    image: Express.Multer.File | string,
    coordinate: string
    address?: string
    absensiTime?: string
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