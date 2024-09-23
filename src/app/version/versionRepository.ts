import { prisma } from "../../config"
import { VersionBodyRequest } from "./versionDTO"

export const createVersion = async (
    androidVersion?: string,
    iosVersion?: string,
    playStoreLink?: string,
    appStoreLink?: string,
    notes?: string
) => {

    return await prisma.version.create({
        data: {
            androidVersion,
            appStoreLink,
            iosVersion,
            notes,
            playstoreLink: playStoreLink
        }
    })
}

export const getVersion = async () => {
    return await prisma.version.findFirst()
}

export const getVersionById = async (versionId: number) => {
    return await prisma.version.findFirst({
        where: {
            id: versionId
        }
    })
}

export const updateVersion = async (
    versionId: number,
    data: VersionBodyRequest
) => {
    return await prisma.version.update({
        where: {
            id: versionId
        },
        data: {
            androidVersion: data.androidVersion || undefined,
            appStoreLink: data.appStoreLink || undefined,
            iosVersion: data.iosVersion || undefined,
            notes: data.notes || undefined,
            playstoreLink: data.playstoreLink || undefined
        }
    })
}