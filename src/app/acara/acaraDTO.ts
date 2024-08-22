import { SubAcara } from "@prisma/client"

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

export interface SubAcaraBodyDTO {
    id?: string
    name?: string
    description?: string,
    image?: string,
    startTime?: Date,
    endTime?: Date
    acaraId: string
}

export interface SubAcaraDTO extends SubAcara {
    isOpenAbsen: boolean,
    isAlreadyAbsen: boolean
}