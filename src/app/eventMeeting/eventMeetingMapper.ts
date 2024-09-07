import { Attendance, EventMeeting, Meeting } from "@prisma/client";
import { EventMeetingDTO, EventMeetingWithMeetingDTO } from "./eventMeetingDTO";

interface MeetingData extends Meeting {
  Attendance: Attendance[]
}

export interface EventMeetingData extends EventMeeting {
  Meeting: MeetingData[]
}

export const eventMeetingsDTOMapper = (data: EventMeetingData[]): EventMeetingDTO[] => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    meetingCount: item.Meeting.length
  }))
}

export const getEventMeetingWithMeetingDTOMapper = (data: EventMeetingData[], userId: string): EventMeetingWithMeetingDTO[] => {
  return data.map(item => ({
    eventMeeting: {
      id: item.id,
      name: item.name,
    },
    meeting: item.Meeting.map(subitem => ({
      id: subitem.id,
      name: subitem.name,
      description: subitem.description as string,
      startTime: subitem.startTime as Date,
      endTime: subitem.endTime as Date,
      isAlreadyAttend: !!subitem.Attendance.find((item) => item.userId === userId)
    }))
  }))
}