import { AcaraModelTypes } from "./acaraTypes";

export const acaraMapper = async (acaras: AcaraModelTypes[]) => {
    const mapper = await Promise.all(acaras.map(async (acara) => {
        const { _id, createdAt, updatedAt, description, endDate, imageUrl, isOpen, name, startDate } = acara
        return {
            id: _id,
            name,
            description,
            startDate,
            endDate,
            isOpen,
            imageUrl,
            createdAt,
            updatedAt,
        }
    }))
    return mapper
}