import { Structural } from "@prisma/client"
import { ImagePath } from "../../utils/ImagePath"

export const structuralMapper = (data: Structural[]) => {
    return data.map(item => ({
        ...item,
        jabatan: item.jabatan?.replace(/_/g, ' '),
        image: item.image.includes('https') ? item.image : ImagePath(`struktural/${item.image}`)
    }))
}