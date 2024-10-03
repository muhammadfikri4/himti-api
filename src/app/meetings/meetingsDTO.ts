import { Query } from "interface/Query"

export interface CreateMeetingBodyRequest {
  name: string
  description: string
  startTime: Date
  endTime: Date
  eventMeetingId: string
}

export interface UpdateMeetingBodyRequest {
  meetingId: string
  name?: string
  description?: string
  startTime?: Date
  endTime?: Date
}

export interface FilterMeeting extends Query {
  eventMeetingId: string
}

export interface MeetingDTO {
  id: string
  name: string
  description?: string
  startTime: Date
  endTime: Date
  resume?: string
  isOpen: boolean
  isAlreadyAttend: boolean
  eventMeeting: {
    id: string
    name: string
  }
}

export interface MeetingsDTO {
  eventMeeting: string,
  meetings: {
    id: string
    name: string
    description: string
    isAlreadyAttend: boolean
    startTime: Date
    endTime: Date
    isOpen: boolean
  }[]
}