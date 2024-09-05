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

interface MeetingsData extends Meeting {
  EventMeeting: EventMeeting
  Attendance : Attendance[]
}

export const groupingMeetingsByEventMeetingsDTOMapper = (meetings:MeetingsData[], userId:string) => {

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
// "id": "04dc55d3-c4e2-430b-bf21-cb7e2743077f",
//   "name": "Rapat Pertama",
//     "description": null,
//       "startTime": "2024-08-22T18:13:10.000Z",
//         "endTime": "2024-09-23T18:13:10.000Z",