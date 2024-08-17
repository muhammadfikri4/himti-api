import { Acara, NotificationHistory, SubAcara } from "@prisma/client";

export interface NotificationData extends NotificationHistory {
    acara: Acara,
    subAcara: SubAcara
}

export const getNotificationDTOMapper = async (data: NotificationData[]) => {

    return data.map(item => {
        let type

        if (item.subAcaraId) {
            type = "ABSENSI"
        } else {
            type = "NEWS"
        }
        return {
            id: item.id,
            title: item.title,
            body: item.body,
            isRead: item.isRead,
            type,
            acara: item.acaraId ? {
                id: item.acara.id,
                name: item.acara.name
            } : null,
            subAcara: item.subAcaraId ? {
                id: item.subAcara.id,
                name: item.subAcara.name
            } : null,
            createdAt: item.createdAt,
            updatedAt: item.updateAt
        }
    })
}