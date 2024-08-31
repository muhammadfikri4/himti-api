import { prisma } from "config"

export const getMeetingById = async(meetingId:string) => {
  return await prisma.meeting.findUnique({
    where: {
      id: meetingId
    }
  })
}