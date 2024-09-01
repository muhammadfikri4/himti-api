import { Query } from "interface/Query"

export interface CreateMeetingBodyRequest {
  name: string
  description: string
  startTime: Date
  endTime: Date
  eventMeetingId: string
}

export interface FilterMeeting extends Query {
  eventMeetingId: string
}

export interface MeetingsDTO {
  eventMeeting: string,
  meetings: {
    id: string
    name: string
    description: string
    startTime: Date
    endTime: Date
  }[]
}