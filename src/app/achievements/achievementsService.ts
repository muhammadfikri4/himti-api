import { Achievement } from "@prisma/client";
import { Query } from "../../interface/Query";
import { Meta } from "../../utils/Meta";
import { getAchievementDTOMapper } from "./achievementsMapper";
import { getPrestasi, getPrestasiCount } from "./achievementsRepository";

export const getPrestasiService = async (query: Query) => {
    const { page = '1', perPage = '10' } = query
    const [prestasi, totalData] = await Promise.all([
        getPrestasi(query),
        getPrestasiCount(query)
    ])

    const meta = Meta(
        Number(page),
        Number(perPage),
        totalData
    )

    const data = getAchievementDTOMapper(prestasi as Achievement[])
    const response = { data, meta }

    return response
}