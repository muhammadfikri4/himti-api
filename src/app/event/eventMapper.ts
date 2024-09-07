import { Attendance, Event, Meeting } from "@prisma/client";
import { ImagePath } from "../../utils/ImagePath";
import { EventDTO } from "./eventDTO";

export interface AttendanceMeetingData extends Meeting {
    attendance: Attendance[]
}

export const eventsDTOMapper = (acaras: Event[]): EventDTO[] => {
    return acaras.map((acara) => {
        return {
            id: acara.id,
            description: acara.description,
            endTime: acara.endTime as Date,
            image: acara.image.includes('https') ? acara.image : ImagePath(`event/${acara.image}`),
            name: acara.name,
            startTime: acara.startTime as Date,
            isOpen: acara.isOpen,
        }
    })
}
export const eventDTOMapper = (event: Event): EventDTO => {
    return {
        id: event.id,
        name: event.name,
        description: event.description,
        image: event.image.includes('https') ? event.image : ImagePath(`event/${event.image}`),
        startTime: event.startTime as Date,
        endTime: event.endTime as Date,
        isOpen: event.isOpen,
    }
}

// export const subAcaraMapper = (subAcaras: AttendanceMeetingData[], userId: string): SubAcaraDTO[] => {
//     return subAcaras.map((item) => {
//         // const { createdAt, updatedAt, ...rest } = item
//         let isAlreadyAbsen = false
//         const absensi = item.absensi.filter((absen) => absen.userId === userId && absen.subAcaraId === item.id)
//         if (absensi.length) {
//             isAlreadyAbsen = true
//         }
//         const isExpired = new Date(item.endTime as Date) < new Date(Date.now())

//         return {
//             id: item.id,
//             name: item.name,
//             description: item.description,
//             image: item?.image?.includes('https') ? item?.image : ImagePath(`acara/${item?.image}`),
//             endTime: item.endTime as Date,
//             startTime: item.startTime as Date,
//             isOpenAbsen: !isExpired,
//             isAlreadyAbsen
//         }
//     })
// }