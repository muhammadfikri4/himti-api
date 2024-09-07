import { Query } from "interface/Query"
import { prisma } from "../../config"

export const getEventMeetingById = async (eventMeetingId: string) => {
  return await prisma.eventMeeting.findUnique({
    where: {
      id: eventMeetingId
    }
  })
}

export const createEventMeeting = async (name: string, description: string) => {
  return await prisma.eventMeeting.create({
    data: {
      name,
      description
    },
    select: {
      id: true
    }
  })
}

export const getEventMeetingByName = async (name: string) => {
  return await prisma.eventMeeting.findFirst({
    where: {
      name
    }
  })
}

export const getEventMeetings = async (query: Query) => {
  const { page = '1', perPage = '10', search = '' } = query
  return await prisma.eventMeeting.findMany({
    where: {
      name: {
        contains: search,
      }
    },
    select: {
      id: true,
      name: true,
      Meeting: {
        select: {
          id: true,
          name: true,
          description: true,
          startTime: true,
          endTime: true,
          Attendance: {
            select: {
              userId: true
            }
          }
        },
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: Number(perPage),
    skip: (Number(page) - 1) * Number(perPage)
  })
}
export const getEventMeetingsCount = async (query: Query) => {
  const { search = '' } = query
  return await prisma.eventMeeting.count({
    where: {
      name: {
        contains: search,
      }
    }
  })
}