import { SubAcaraModelTypes } from "./subAcaraTypes";

export const subAcaraMapper = (subAcaras: SubAcaraModelTypes[]) => {
    const mapper = subAcaras.map((subAcara) => {
        const { isOpen, isOpenAbsen, createdAt, updatedAt, ...rest } = subAcara
        return {
            ...rest,
            isOpenRegister: subAcara.isOpen,
            isOpenAbsen,
            createdAt,
            updatedAt

        }
    })
    return mapper
}