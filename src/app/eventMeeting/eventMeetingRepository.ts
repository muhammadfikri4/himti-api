import { prisma } from "../../config"

export const getEventMeetingById = async(eventMeetingId:string) => {
  return await prisma.eventMeeting.findUnique({
    where: {
      id: eventMeetingId
    }
  })
}

export const createEventMeeting = async(name:string, description:string) => {
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

export const getEventMeetingByName = async(name:string) => {
  return await prisma.eventMeeting.findFirst({
    where: {
      name
    }
  })
}