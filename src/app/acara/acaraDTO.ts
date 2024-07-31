
export interface AcaraBodyDTO {
    id?: string
    name?: string
    description?: string,
    image?: string,
    isOpenRegister?: boolean,
    isOpenAbsen?: boolean,
    startTime?: Date,
    endTime?: Date
}

export interface SubAcaraBodyDTO extends AcaraBodyDTO {
    acaraId: string
}