import { EventMeeting, Meeting } from "@prisma/client";
import { MeetingsDTO } from "./meetingsDTO";

export interface MeetingData extends Meeting {
  EventMeeting: EventMeeting
}

export const meetingsDTOMapper = (data: MeetingData[]): MeetingsDTO[] => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description as string,
    startTime: item.startTime as Date,
    endTime: item.endTime as Date,
    eventMeeting: {
      id: item.EventMeeting.id,
      name: item.EventMeeting.name
    }
  }))
}