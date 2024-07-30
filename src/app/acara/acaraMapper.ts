import { AcaraModelTypes } from "./acaraTypes";

export const acaraMapper = (acaras: AcaraModelTypes[]) => {
    const mapper = acaras.map((acara) => {
        const { isOpen, isOpenAbsen, createdAt, updatedAt, ...rest } = acara
        return {
            ...rest,
            isOpenRegister: acara.isOpen,
            isOpenAbsen,
            createdAt,
            updatedAt

        }
    })
    return mapper
}