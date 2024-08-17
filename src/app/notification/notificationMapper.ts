import { Acara, NotificationHistory, Role, SubAcara } from "@prisma/client";
import { FormatIDTime } from "../../utils/FormatIDTime";

export interface NotificationData extends NotificationHistory {
    acara: Acara,
    subAcara: SubAcara
}

export const getNotificationDTOMapper = async (data: NotificationData[], role: Role) => {

    return data.map((item) => {
        let type

        if (item.subAcaraId && role === 'ANGGOTA') {
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
            createdAt: FormatIDTime(item.createdAt),
            updatedAt: FormatIDTime(item.updateAt)
        }
    })
}