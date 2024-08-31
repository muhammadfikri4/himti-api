export interface AttendanceDTO {
    userId?: string
    meetingId: string
    image: Express.Multer.File | string,
    coordinate: string
    address?: string
    attendanceTime?:string
}

export interface TokenTypes {
    id: string
}

export interface IFilterAttendance {
    userId?: string
    acaraId?: string
    subAcaraId?: string
    page?: number
    perPage?: number
}