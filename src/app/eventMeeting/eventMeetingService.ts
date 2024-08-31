import { ErrorApp } from "../../utils/HttpError";
import { CreateEventMeetingBodyRequest } from "./eventMeetingDTO";
import { createEventMeeting, getEventMeetingByName } from "./eventMeetingRepository";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";

export const createEventMeetingService = async(body:CreateEventMeetingBodyRequest) => {
  
  const eventMeeting = await getEventMeetingByName(body.name)
  if (eventMeeting) {
    return new ErrorApp(MESSAGES.ERROR.ALREADY.EVENT_MEETING, 400, MESSAGE_CODE.BAD_REQUEST)
  }
  const data = await createEventMeeting(body.name, body.description)

  return data

}