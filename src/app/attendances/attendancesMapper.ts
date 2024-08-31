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

export interface EventMeeting extends Attendance {
    eventMeeting: {
        id: string
        name: string
    },
    meeting: {
        id: string
        name: string
        eventMeetingId:string
    }
    Point: Point[]
}

export const absensiMapper = (data: Attendance[]) => {
    return data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, ...rest } = item

        return rest

    })
}

export const historyAbsensiMapper = (absensi: EventMeeting[]): MeetingHistoryResponse[] => {
    const data: EventMeeting[] = []
    absensi.map((item) => {
        if (data.find((i: EventMeeting) => i.meeting.eventMeetingId === item.eventMeeting.id)) {
            return null
        }
        data.push(item as unknown as EventMeeting)
    })

    const attend = data.map(item => {
        const meeting = absensi.filter(i => i.meetingId === item.meetingId)
        return {
            eventMeeting: {
                id: item.eventMeeting.id,
                name: item.eventMeeting.name
            },
            attendance: meeting.map(meet => {
                return {
                    id: meet.id,
                    image: meet.image.includes('https')? meet.image : ImagePath(`absensi/${meet.image}`),
                    attendanceTime: meet.attendanceTime as string,
                    meeting: {
                        id: meet.meeting.id,
                        name: meet?.meeting?.name as string
                    },
                    point: meet.Point.reduce((a: number, b: Point) => a + b.point, 0)
                }
            })
        }
    })
    return attend
}