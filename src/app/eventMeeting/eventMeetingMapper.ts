import { Attendance, EventMeeting, Meeting } from "@prisma/client";
import { EventMeetingDTO, EventMeetingWithMeetingDTO } from "./eventMeetingDTO";
import { generateOpen } from "../../utils/GenerateOpen";
import { FormatIDTime } from "utils/FormatIDTime";

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
    meeting: item.Meeting.map(subitem => {
      console.log(subitem)
      return {
        id: subitem.id,
        name: subitem.name,
        description: subitem.description as string,
        startTime: subitem.startTime as Date,
        endTime: subitem.endTime as Date,
        startTimeID: FormatIDTime(subitem.startTime as Date, 'date') as Date,
        endTimeID: FormatIDTime(subitem.endTime as Date, 'date') as Date,
        isOpen: generateOpen(subitem.startTime, subitem.endTime),
        isAlreadyAttend: !!subitem.Attendance.find((item) => item.userId === userId)
      }
    })
  }))
}