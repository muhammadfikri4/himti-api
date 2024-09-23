
export interface EventBodyDTO {
    id?: string
    name?: string
    description?: string,
    image?: string,
    isOpen?: boolean,
    startTime?: Date,
    endTime?: Date
}
export interface CreateEventBodyRequest {
    id?: string
    name?: string
    description?: string,
    image?: Express.Multer.File | string,
    isOpen?: boolean,
    startTime?: Date | string,
    endTime?: Date | string
}

export interface EventDTO {
    id: string
    name: string
    image: string
    startTime: Date
    endTime: Date
    description?: string | null
    isOpen: boolean
}

// export interface SubAcaraBodyDTO {
//     id?: string
//     name?: string
//     description?: string,
//     image?: string,
//     startTime?: Date,
//     endTime?: Date
//     acaraId: string
// }

// export interface SubAcaraDTO {
//     id: string
//     name: string
//     description: string | null
//     image: string
//     endTime: Date
//     startTime: Date
//     isOpenAbsen: boolean
//     isAlreadyAbsen: boolean
// }