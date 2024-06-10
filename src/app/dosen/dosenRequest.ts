import { DosenModelTypes } from "./dosenTypes";

export const dosenMapper = (dosens: DosenModelTypes[]) => {
    const mapper = dosens.map(dosen => {
        return {
            id: dosen._id,
            nidn: dosen.nidn,
            name: dosen.name,
            email: dosen.email,
            numberPhone: dosen.numberPhone,
            mataKuliah: dosen.mataKuliah

        }
    })
    return mapper
}