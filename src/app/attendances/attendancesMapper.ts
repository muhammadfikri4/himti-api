import { Attendance, Point } from "@prisma/client";
import { ImagePath } from "../../utils/ImagePath";

interface MeetingHistoryResponse {
    eventMeeting: {
        id: string,
        name: string
    },
    attendance: {
        id: number
        image: string
        attendanceTime: string
        meeting: {
            id: string
            name: string
        }
    }[]
}

export interface EventMeetingData extends Attendance {
    eventMeetingId:string
    meetingId:string
    Meeting: {
        id: string
        name: string
    }
    EventMeeting: {
        id: string
        name: string
    },
    Point: Point[]
}

export const absensiMapper = (data: Attendance[]) => {
    return data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, ...rest } = item

        return rest

    })
}

export const historyAbsensiMapper = (absensi: EventMeetingData[]): MeetingHistoryResponse[] => {
    const data: EventMeetingData[] = []
    absensi.map((item) => {
        if (data.find((i: EventMeetingData) => i.eventMeetingId === item.eventMeetingId)) {
            return null
        }
        data.push(item as unknown as EventMeetingData)
    })

    const attend = data.map(item => {
        const meeting = absensi.filter(i => i.eventMeetingId === item.eventMeetingId)
        return {
            eventMeeting: {
                id: item.EventMeeting.id,
                name: item.EventMeeting.name
            },
            attendance: meeting.map(meet => {
                return {
                    id: meet.id,
                    image: meet.image.includes('https')? meet.image : ImagePath(`absensi/${meet.image}`),
                    attendanceTime: meet.attendanceTime as string,
                    meeting: {
                        id: meet.Meeting.id,
                        name: meet?.Meeting?.name as string
                    },
                    point: meet.Point.reduce((a: number, b: Point) => a + b.point, 0)
                }
            })
        }
    })
    return attend
}

export const getAttendanceDTOMapper = (data:EventMeetingData) => {
    return {
        id: data.id,
        address: data.address,
        coordinate: data.coordinate as string,
        attendanceTime: data.attendanceTime as string,
        image: data.image.includes('https')? data.image : ImagePath(`attendance/${data.image}`),
        meeting: {
            id: data.Meeting.id,
            name: data?.Meeting?.name as string
        },
        eventMeeting: {
            id: data.EventMeeting.id,
            name: data.EventMeeting.name
        },
        point: data.Point.reduce((a: number, b: Point) => a + b.point, 0)
    }
}