
export interface AcaraBodyDTO {
    id?: string
    name?: string
    description?: string,
    image?: string,
    isOpen?: boolean,
    startTime?: Date,
    endTime?: Date
}

export interface SubAcaraBodyDTO extends AcaraBodyDTO {
    acaraId: string
}