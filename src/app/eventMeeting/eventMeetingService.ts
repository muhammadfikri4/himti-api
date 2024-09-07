import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { Meta } from "../../utils/Meta";
import { CreateEventMeetingBodyRequest } from "./eventMeetingDTO";
import { EventMeetingData, eventMeetingsDTOMapper } from "./eventMeetingMapper";
import { createEventMeeting, getEventMeetingByName, getEventMeetings, getEventMeetingsCount } from "./eventMeetingRepository";

export const createEventMeetingService = async (body: CreateEventMeetingBodyRequest) => {

  const eventMeeting = await getEventMeetingByName(body.name)
  if (eventMeeting) {
    return new ErrorApp(MESSAGES.ERROR.ALREADY.EVENT_MEETING, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const data = await createEventMeeting(body.name, body.description)

  return data

}

export const getEventMeetingsService = async (query: Query) => {

  const { page = '1', perPage = '10' } = query
  const [eventMeetings, totalData] = await Promise.all([
    getEventMeetings(query),
    getEventMeetingsCount(query)
  ])

  const meta = Meta(
    Number(page),
    Number(perPage),
    totalData
  )

  const data = eventMeetingsDTOMapper(eventMeetings as EventMeetingData[])

  return {
    data,
    meta
  }
}