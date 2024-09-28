export interface CreateEventMeetingBodyRequest {
  name: string
  description: string
}

export interface EventMeetingDTO {
  id: string
  name: string
  meetingCount: number
}

export interface MeetingEv {
  id: string
  name: string
  description: string
  startTime: Date
  endTime: Date
  startTimeID: Date
  endTimeID: Date
  isOpen:boolean
  isAlreadyAttend: boolean
}

export interface EventMeetingWithMeetingDTO {
  eventMeeting: {
    id: string
    name: string
  },
  meeting: MeetingEv[]
}