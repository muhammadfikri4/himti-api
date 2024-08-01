import { AngkatanModelTypes } from "./angkatanTypes";

export const angkatanMapper = (angkatans: AngkatanModelTypes[]) => {
    return angkatans.map((angkatan) => {
        return {
            id: angkatan.id,
            year: angkatan.year,
            isActive: angkatan.isActive
        }
    })
}