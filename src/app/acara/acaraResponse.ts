import { AcaraModelTypes, IAcaraResponse } from "./acaraTypes";

export const acaraMapper = async (acaras: AcaraModelTypes[]): Promise<IAcaraResponse[]> => {
    const mapper = await Promise.all(acaras.map(async (acara) => {
        const { _id, createdAt, updatedAt, description, endTime, image, isOpen, name, startTime, } = acara
        return {
            id: _id,
            name,
            description,
            startTime,
            endTime,
            isOpen,
            image,
            createdAt,
            updatedAt,
        }
    }))
    return mapper
}