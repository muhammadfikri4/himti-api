import { Query } from "interface/Query"

export interface AttendanceDTO {
    userId?: string
    meetingId: string
    eventMeetingId?:string
    image: Express.Multer.File | string,
    coordinate: string
    address?: string
    attendanceTime?:string
}

export interface TokenTypes {
    id: string
}
export interface FilterAttendance extends Query {
    userId?:string
    meetingId?:string
}