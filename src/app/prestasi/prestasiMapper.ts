import { Prestasi } from "@prisma/client";
import { PrestasiDTO } from "./prestasiDTO";

export const getPrestasiDTOMapper = (data: Prestasi[]): PrestasiDTO[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        image: item.image
    }))
}