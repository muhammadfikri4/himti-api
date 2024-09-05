import { Query } from "../../interface/Query"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { Meta } from "../../utils/Meta"
import { getEventMeetingById } from "../eventMeeting/eventMeetingRepository"
import { CreateMeetingBodyRequest, FilterMeeting } from "./meetingsDTO"
import { MeetingData, getMeetingDTOMapper, groupingMeetingsByEventMeetingsDTOMapper, meetingsDTOMapper } from "./meetingsMapper"
import { createMeeting, getMeetingByEventMeetingId, getMeetingById, getMeetings, getMeetingsByEventMeetingId, getMeetingsByEventMeetingIdCount, getMeetingsCount } from "./meetingsRepository"

export const createMeetingService = async (body: CreateMeetingBodyRequest) => {

  const eventMeeting = await getEventMeetingById(body.eventMeetingId)

  if (!eventMeeting) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.EVENT_MEETING, 404, MESSAGE_CODE.NOT_FOUND)
  }

  const meeting = await getMeetingByEventMeetingId(body.eventMeetingId, body.name)

  if (meeting?.name === body.name) {
    return new ErrorApp(MESSAGES.ERROR.ALREADY.MEETING, 400, MESSAGE_CODE.BAD_REQUEST)
  }

  const timeNotValid = new Date(body.startTime as Date) < new Date(body.endTime as Date)

  if (!timeNotValid) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.TIME, 400, MESSAGE_CODE.BAD_REQUEST)
  }

  const data = await createMeeting({
    ...body,
    startTime: new Date(body.startTime as Date),
    endTime: new Date(body.endTime as Date)
  })
  return data
}

export const getMeetingsByEventMeetingsIdService = async (query: FilterMeeting, userId: string) => {
  const { page = '1', perPage = '10' } = query
  const [meetings, totalData] = await Promise.all([
    getMeetingsByEventMeetingId(query),
    getMeetingsByEventMeetingIdCount(query)
  ])

  const meta = Meta(
    Number(page),
    Number(perPage),
    totalData
  )
console.log(meetings)
  const data = meetingsDTOMapper(meetings as MeetingData[], userId)

  return {
    data,
    meta
  }

}

export const getMeetingsService = async(query: Query,userId:string) => {
  const {page = '1', perPage = '10'} = query
  const [meetings, totalData] = await Promise.all([
    getMeetings(query),
    getMeetingsCount()
  ])

  const meta = Meta(
    Number(page),
    Number(perPage),
    totalData
  )

  const data = groupingMeetingsByEventMeetingsDTOMapper(meetings as MeetingData[], userId as string)

  return {
    data,
    meta
  }
}

export const getMeetingByIdService = async(meetingId:string, userId:string) => {

  const meeting = await getMeetingById(meetingId)

  if (!meeting) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.MEETING, 404, MESSAGE_CODE.NOT_FOUND)
  }

  const data = getMeetingDTOMapper(meeting as MeetingData, userId)

  return data
}