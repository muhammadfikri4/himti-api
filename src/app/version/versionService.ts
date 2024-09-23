import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { VersionBodyRequest } from "./versionDTO"
import { getVersion, getVersionById, updateVersion } from "./versionRepository"

export const updateVersionService = async (versionId: number, body: VersionBodyRequest) => {
    const version = await getVersionById(versionId)

    if (!version) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.VERSION, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return await updateVersion(version.id, body)
}

export const getVersionService = async () => {
    const version = await getVersion()

    if (!version) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.VERSION, 404, MESSAGE_CODE.NOT_FOUND)
    }
    const { id, ...rest } = version
    return rest
}