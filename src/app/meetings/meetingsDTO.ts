import { Query } from "interface/Query"

export interface CreateMeetingBodyRequest {
  name: string
  description: string
  startTime: Date
  endTime: Date
  eventMeetingId:string
}

export interface FilterMeeting extends Query {
  eventMeetingId: string
}

export interface MeetingsDTO {
  id: string
  name: string
  description: string
  startTime: Date
  endTime: Date
  eventMeeting: {
    id: string
    name: string
  }
}