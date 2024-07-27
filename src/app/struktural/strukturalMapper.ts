import { Struktural } from "@prisma/client"

export const strukturalMapper = (data: Struktural[]) => {
    return data.map(item => ({
        ...item,
        jabatan: item.jabatan?.replace(/_/g, ' ')
    }))
}