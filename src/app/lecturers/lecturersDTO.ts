export interface LecturerBodyDTO {
    id?: string
    nidn?: string
    name?: string,
    email?: string,
    numberPhone?: string,
    lesson?: string
    isActive?: boolean
}


export interface LecturerDTO {
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

export interface IFilterLecturer {
    search?: string
    page?: number
    perPage?: number
}