import { Attendance, EventMeeting, Meeting, User } from "@prisma/client";
import { MeetingDTO, MeetingsDTO } from "./meetingsDTO";
import { generateOpen } from "../../utils/GenerateOpen";

export interface AttendanceData extends Attendance {
  User: User
}

export interface MeetingData extends Meeting {
  EventMeeting: EventMeeting
  Attendance: AttendanceData[]
}

interface MeetingsData extends Meeting {
  EventMeeting: EventMeeting
  Attendance: Attendance[]
}

export const meetingsDTOMapper = (data: MeetingData[], userId: string): MeetingsDTO => {
  const datas = data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description as string,
    startTime: item.startTime as Date,
    endTime: item.endTime as Date,
    isAlreadyAttend: !!item.Attendance.find((item) => item.userId === userId)
  }))
  return {
    eventMeeting: data[0]?.EventMeeting.name as string,
    meetings: datas
  }
}

export const groupingMeetingsByEventMeetingsDTOMapper = (meetings: MeetingsData[], userId: string) => {

  const data: MeetingsData[] = []
  meetings.map((item) => {
    if (data.find((i) => i.eventMeetingId === item.eventMeetingId)) {
      return null
    }
    data.push(item)
  })

  const attend = data.map(item => {
    const meeting = meetings.filter(i => i.eventMeetingId === item.eventMeetingId)
    return {
      eventMeeting: {
        id: item.EventMeeting.id,
        name: item.EventMeeting.name
      },
      meeting: meeting.map(meet => {
        return {
          id: meet.id,
          name: meet.name,
          description: meet.description,
          startTime: meet.startTime as Date,
          endTime: meet.endTime as Date,
          isAlreadyAttend: !!meet.Attendance.find((item) => item.userId === userId)

        }
      })
    }
  })
  return attend
}

export const getMeetingDTOMapper = (data: MeetingData, userId:string): MeetingDTO => {

  return {
    id: data.id,
    name: data.name,
    description: data.description as string,
    startTime: data.startTime as Date,
    endTime: data.endTime as Date,
    isAlreadyAttend: !!data.Attendance.find((item) => item.userId === userId),
    resume: data.resume as string,
    isOpen: generateOpen(data.startTime, data.endTime),
    eventMeeting: {
      id: data.EventMeeting.id,
      name: data.EventMeeting.name
    }
  }
}