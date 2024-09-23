import { Event, EventMeeting, NotificationHistory, Role } from "@prisma/client";
import { FormatIDTime } from "../../utils/FormatIDTime";

export interface NotificationData extends NotificationHistory {
  Event: Event,
  EventMeeting: EventMeeting
}

export const getNotificationDTOMapper = (data: NotificationData[], role: Role) => {
  // Group data by date
  const groupedByDate = data.reduce((acc, item) => {
    const dateKey = new Date(item.createdAt).toISOString().split('T')[0]; // Get the date part only (YYYY-MM-DD)

    // Initialize the date group if it doesn't exist
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: FormatIDTime(item.createdAt) as string,
        items: []
      };
    }

    // Determine the notification type
    let type;
    if (item.eventMeetingId && role === 'ANGGOTA') {
      type = "ATTEND";
    } else if(item.eventId) {
      type = "EVENT";
    } else {
      type = "NEWS";
    }

    // Map the notification item
    const mappedItem = {
      id: item.id,
      title: item.title,
      body: item.body,
      isRead: item.isRead,
      type,
      event: item.eventId ? {
        id: item.Event.id,
        name: item.Event.name
      } : null,
      eventMeeting: item.eventMeetingId ? {
        id: item.EventMeeting.id,
        name: item.EventMeeting.name
      } : null,
      createdAt: FormatIDTime(item.createdAt),
      updatedAt: FormatIDTime(item.updatedAt)
    };

    // Push the mapped item into the correct date group
    acc[dateKey].items.push(mappedItem);

    return acc;
  }, {} as Record<string, { date: string; items: unknown[] }>);

  // Convert the grouped object into an array
  return Object.values(groupedByDate);
};

// export const getNotificationDTOMapper = async (data: NotificationData[], role: Role) => {
//     // Group data by date
//     const groupedByDate = data.reduce((acc, item) => {
//         const dateKey = FormatIDTime(item.createdAt).split(' ')[0]; // Get the date part only (YYYY-MM-DD)

//         // Map the notification item
//         let type;
//         if (item.subAcaraId && role === 'ANGGOTA') {
//             type = "ABSENSI";
//         } else {
//             type = "NEWS";
//         }

//         const mappedItem = {
//             id: item.id,
//             title: item.title,
//             body: item.body,
//             isRead: item.isRead,
//             type,
//             acara: item.acaraId ? {
//                 id: item.acara.id,
//                 name: item.acara.name
//             } : null,
//             subAcara: item.subAcaraId ? {
//                 id: item.subAcara.id,
//                 name: item.subAcara.name
//             } : null,
//             createdAt: FormatIDTime(item.createdAt),
//             updatedAt: FormatIDTime(item.updateAt)
//         };

//         // Check if the date key already exists in the accumulator
//         if (!acc[dateKey]) {
//             acc[dateKey] = {
//                 date: dateKey,
//                 items: []
//             };
//         }

//         // Push the mapped item into the correct date group
//         acc[dateKey].items.push(mappedItem);

//         return acc;
//     }, {} as Record<string, { date: string; items: any[] }>);

//     // Convert the object into an array of grouped items
//     return Object.values(groupedByDate);
// };
