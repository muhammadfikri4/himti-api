import { DosenModelTypes } from "./dosenTypes";

export const dosenMapper = (dosens: DosenModelTypes[]): DosenModelTypes[] => {
    const mapper = dosens.map((dosen: DosenModelTypes) => {
        const { nidn, numberPhone } = dosen
        return {
            ...dosen,
            nidn: Number(nidn),
            numberPhone: Number(numberPhone)

        }
    })
    return mapper
}