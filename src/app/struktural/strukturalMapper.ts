import { Structural } from "@prisma/client"

export const structuralMapper = (data: Structural[]) => {
    return data.map(item => ({
        ...item,
        jabatan: item.jabatan?.replace(/_/g, ' ')
    }))
}