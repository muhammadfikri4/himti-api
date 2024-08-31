import { Prisma } from "@prisma/client"
import { prisma } from "../../config"
import { AttendanceDTO } from "./attendancesDTO"

export const createAttendance = async ({ image, userId, coordinate, meetingId, address, attendanceTime }: AttendanceDTO) => {
    return await prisma.attendance.create({
        data: {
            image: image as string,
            meetingId: meetingId as string,
            userId: userId as string,
            coordinate: coordinate as string,
            address,
            attendanceTime: attendanceTime as string,
        },
        select: {
            id: true,
            coordinate: true,
            address: true,
            createdAt: true
        }
    })
}

export const getHistoryAttendanceByUserId = async (userId: string, eventMeetingId?: string, meetingId?: string, page?: number, perPage?: number) => {

    const filter = {
        OR: [
            { userId }
        ]
    } as { OR: Prisma.AttendanceWhereInput[] }

    if (eventMeetingId) {
        filter.OR = [...filter.OR, {
            Meeting: {
                eventMeetingId
            }
        }]
    }

    if (meetingId) {
        filter.OR = [...filter.OR, { meetingId }]
    }

    return await prisma.attendance.findMany({
        where: filter,
        include: {
            Meeting: {
                select: {
                    id: true,
                    name: true,
                    EventMeeting: true
                },
            },
            User: {
                select: {
                    id: true,
                    name: true,
                    nim: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getSingleAttendanceByUserId = async (userId: string, meetingId: string) => {
    return await prisma.attendance.findFirst({
        where: {
            userId,
            AND: {
                meetingId
            }
        }
    })
}

export const getAttendanceByMeetingId = async (meetingId: string, userId: string) => {
    return await prisma.attendance.findFirst({
        where: {
            meetingId,
            userId
        }
    })
}

export const getAttendanceByUserId = (userId: string, eventMeetingId?: string) => {
    // return prisma.absensi.findMany({
    //     where: {
    //         userId,
    //         acaraId
    //     },
    //     select: {
    //         id: true,
    //         image: true,
    //         absensiTime: true,
    //         acara: {
    //             select: {
    //                 id: true,
    //                 name: true,
    //             },
    //         },
    //         subAcara: {
    //             select: {
    //                 id: true,
    //                 name: true,
    //             }
    //         },
    //         Point: {
    //             select: {
    //                 point: true
    //             }
    //         },

    //     },
    //     orderBy: {
    //         createdAt: 'desc'
    //     }
    // })
    return prisma.attendance.findMany({
        where: {
            userId,
            Meeting: {
                eventMeetingId
            }
        },
        include: {
            Meeting: {
                select: {
                    id: true,
                    name: true,
                    EventMeeting: true
                },
            },
            Point: {
                select: {
                    point: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getAllAttendanceByMeetingId = async (meetingId: string, userId: string) => {
    return await prisma.attendance.findMany({
        where: {
            meetingId,
            userId
        },
        include: {
            User: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export const getAttendanceById = async (attendanceId: number) => {
    return await prisma.attendance.findUnique({
        where: {
            id: attendanceId
        },
        include: {
            Meeting: {
                include: {
                    EventMeeting: true
                }
            },
            User: true
        }
    })
}

export const getAllAbsensiByEventMeetingId = async (eventMeetingId: string, userId: string) => {
    return await prisma.attendance.findMany({
        where: {
            Meeting: {
                eventMeetingId
            },
            userId
        },
        include: {
            User: {
                select: {
                    id: true,
                    name: true
                }
            },
            Meeting: {
                select: {
                    id: true,
                    name: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const getAbsensiById = async (id: number) => {
    return await prisma.attendance.findUnique({
        where: {
            id
        },
        include: {
            Meeting: {
                select: {
                    id: true,
                    name: true,
                    EventMeeting: true
                }
            },
            User: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export const getAbsensies = async (
    meetingId: string,
    page: number = 1,
    perPage: number = 10
) => {
    return await prisma.attendance.findMany({
        where: {
            meetingId
        },
        select: {
            id: true,
            User: {
                select: {
                    id: true,
                    name: true,
                    nim: true
                }
            },
            image: true
        },
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage)
    })
}