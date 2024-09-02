import { Attendance, EventMeeting, Meeting, User } from "@prisma/client";
import { MeetingsDTO } from "./meetingsDTO";

export interface AttendanceData extends Attendance {
 
  User: User
}

export interface MeetingData extends Meeting {
  EventMeeting: EventMeeting
  Attendance: AttendanceData[]
  
}

export const meetingsDTOMapper = (data: MeetingData[], userId:string): MeetingsDTO => {
  const datas = data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description as string,
    startTime: item.startTime as Date,
    endTime: item.endTime as Date,
    isAlreadyAttend: !!item.Attendance.find((item) => item.userId === userId)
  }))
  return {
    eventMeeting: data[0].EventMeeting.name as string,
    meetings: datas
  }
}