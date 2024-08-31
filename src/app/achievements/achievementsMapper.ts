import { Achievement } from "@prisma/client";
import { AchievementDTO } from "./achievementsDTO";

export const getAchievementDTOMapper = (data: Achievement[]): AchievementDTO[] => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        image: item.image
    }))
}