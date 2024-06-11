import { AngkatanModelTypes } from "./angkatanTypes";

export const angkatanMapper = (angkatans: AngkatanModelTypes[]) => {
    const mapper = angkatans.map(angkatan => {
        return {
            id: angkatan._id,
            angkatan: angkatan.angkatan,
            isActive: angkatan.isActive
        }
    })
    return mapper
}