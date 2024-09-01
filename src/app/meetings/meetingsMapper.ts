import { EventMeeting, Meeting } from "@prisma/client";
import { MeetingsDTO } from "./meetingsDTO";

export interface MeetingData extends Meeting {
  EventMeeting: EventMeeting
}

export const meetingsDTOMapper = (data: MeetingData[]): MeetingsDTO => {
  const datas = data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description as string,
    startTime: item.startTime as Date,
    endTime: item.endTime as Date,
  }))
  return {
    eventMeeting: data[0].EventMeeting.name as string,
    meetings: datas
  }
}