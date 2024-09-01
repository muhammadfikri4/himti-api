import { EventMeeting, Meeting } from "@prisma/client";
import { EventMeetingDTO } from "./eventMeetingDTO";

export interface EventMeetingData extends EventMeeting {
Meeting: Meeting[]
}

export const eventMeetingsDTOMapper = (data:EventMeetingData[]):EventMeetingDTO[] => {
  return data.map(item => ({
    id:item.id,
    name: item.name,
    meetingCount: item.Meeting.length
  }))
}