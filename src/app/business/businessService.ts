import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { Meta } from "../../utils/Meta";
import { BusinessDTO, IFilterBusiness } from "./businessDTO";
import { createMerchandise, getMerchandiseByTitle, getMerchandises, getMerchandisesCount, getServiceByTitle, getServices, getServicesCount } from "./businessRepository";

export const createMerchandiseService = async (data: BusinessDTO) => {
    const { title } = data
    const getMerch = await getMerchandiseByTitle(title)

    if (!data.image) return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    if (getMerch) return new ErrorApp(MESSAGES.ERROR.ALREADY.MERCHANDISE, 400, MESSAGE_CODE.BAD_REQUEST)
    if (data?.image?.size as number > 5242880) return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)

    const response = await createMerchandise(data)
    return response
}
export const createServiceService = async (data: BusinessDTO) => {
    const { title } = data
    const getService = await getServiceByTitle(title)

    if (!data.image) return new ErrorApp(MESSAGES.ERROR.REQUIRED.IMAGE, 400, MESSAGE_CODE.BAD_REQUEST)
    if (getService) return new ErrorApp(MESSAGES.ERROR.ALREADY.MERCHANDISE, 400, MESSAGE_CODE.BAD_REQUEST)
    if (data?.image?.size as number > 5242880) return new ErrorApp(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)

    const response = await createMerchandise(data)
    return response
}

export const getMerchandiseService = async ({ page = 1, perPage = 10, search }: IFilterBusiness) => {

    const [merchandise, totalData] = await Promise.all([getMerchandises({ page, perPage, search }), getMerchandisesCount({ search })])
    const meta = Meta(page, perPage, totalData)
    if (!merchandise.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.MERCHANDISE, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: merchandise, meta }

}
export const getServiceService = async ({ page = 1, perPage = 10, search }: IFilterBusiness) => {

    const [service, totalData] = await Promise.all([getServices({ page, perPage, search }), getServicesCount({ search })])
    const meta = Meta(page, perPage, totalData)
    if (!service.length && !meta.totalPages && !meta.totalData) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.SERVICE, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return { data: service, meta }

}