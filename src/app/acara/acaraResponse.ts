import { AcaraModelTypes } from "./acaraTypes";

export const acaraMapper = async (acaras: AcaraModelTypes[]): Promise<AcaraModelTypes[]> => {
    const mapper = await Promise.all(acaras.map(async (acara) => {
        const { id, createdAt, updatedAt, description, endTime, image, isOpen, name, startTime } = acara
        return {
            id,
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