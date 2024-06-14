import { AcaraModelTypes } from "./acaraTypes";

export const acaraMapper = async (acaras: AcaraModelTypes[]) => {
    const mapper = await Promise.all(acaras.map(async (acara) => {
        const { _id, createdAt, updatedAt, description, endTime, imageUrl, isOpen, name, startTime } = acara
        return {
            id: _id,
            name,
            description,
            startTime,
            endTime,
            isOpen,
            imageUrl,
            createdAt,
            updatedAt,
        }
    }))
    return mapper
}