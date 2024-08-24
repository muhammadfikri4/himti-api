import { Prestasi } from "@prisma/client";
import { Query } from "../../interface/Query";
import { Meta } from "../../utils/Meta";
import { getPrestasiDTOMapper } from "./prestasiMapper";
import { getPrestasi, getPrestasiCount } from "./prestasiRepository";

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

    const data = getPrestasiDTOMapper(prestasi as Prestasi[])
    const response = { data, meta }

    return response
}