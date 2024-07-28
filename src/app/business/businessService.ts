import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { BusinessDTO } from "./businessDTO";
import { createMerchandise, getMerchandiseByTitle, getServiceByTitle } from "./businessRepository";

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