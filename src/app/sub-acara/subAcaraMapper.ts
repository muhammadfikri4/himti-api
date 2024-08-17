import { SubAcaraModelTypes } from "./subAcaraTypes";

export const subAcaraMapper = (subAcaras: SubAcaraModelTypes[]) => {
    const mapper = subAcaras.map((subAcara) => {
        const { createdAt, updatedAt, ...rest } = subAcara
        const isExpired = new Date(rest.endTime as Date) < new Date(Date.now())

        return {
            ...rest,
            isOpenAbsen: isExpired,
            createdAt,
            updatedAt

        }
    })
    return mapper
}