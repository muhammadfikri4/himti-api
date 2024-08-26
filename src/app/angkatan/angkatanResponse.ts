import { Angkatan } from "@prisma/client";

export const angkatanMapper = (angkatans: Angkatan[]) => {
    return angkatans.map((angkatan) => {
        const now = new Date().getFullYear()

        return {
            id: angkatan.id,
            year: angkatan.year,
            isActive: Number(angkatan.year) <= now - 5 ? false : true,
        }
    })
}