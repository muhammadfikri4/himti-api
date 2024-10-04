import { deleteMeetingManyByEventMeetingId } from "app/meetings/meetingsRepository";
import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { Meta } from "../../utils/Meta";
import {
  CreateEventMeetingBodyRequest,
  UpdateEventMeetingRequest,
} from "./eventMeetingDTO";
import {
  EventMeetingData,
  eventMeetingsDTOMapper,
  getEventMeetingWithMeetingDTOMapper,
} from "./eventMeetingMapper";
import {
  createEventMeeting,
  deleteEventMeeting,
  getEventMeetingById,
  getEventMeetingByName,
  getEventMeetings,
  getEventMeetingsCount,
  updateEventMeeting,
} from "./eventMeetingRepository";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const createEventMeetingService = async (
  body: CreateEventMeetingBodyRequest
) => {
  const eventMeeting = await getEventMeetingByName(body?.name ?? "");
  if (eventMeeting) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.EVENT_MEETING,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const data = await createEventMeeting(body?.name ?? "", body?.description);

  return data;
};
export const updateEventMeetingService = async (
  body: UpdateEventMeetingRequest
) => {
  const eventMeeting = await getEventMeetingById(body.eventMeetingId);
  if (!eventMeeting) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.EVENT_MEETING,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const duplicate = await getEventMeetingByName(body.name ?? "");
  if (duplicate) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.EVENT_MEETING,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const data = await updateEventMeeting({
    eventMeetingId: eventMeeting.id,
    description: body.description,
    name: body.name,
  });

  return data;
};

export const getEventMeetingsService = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [eventMeetings, totalData] = await Promise.all([
    getEventMeetings(query),
    getEventMeetingsCount(query),
  ]);

  const meta = Meta(Number(page), Number(perPage), totalData);

  const data = eventMeetingsDTOMapper(eventMeetings as EventMeetingData[]);

  return {
    data,
    meta,
  };
};

export const getEventMeetingWithMeetingService = async (
  query: Query,
  userId: string
) => {
  const { page = "1", perPage = "10" } = query;
  const [eventMeetings, totalData] = await Promise.all([
    getEventMeetings(query),
    getEventMeetingsCount(query),
  ]);

  const meta = Meta(Number(page), Number(perPage), totalData);

  const data = getEventMeetingWithMeetingDTOMapper(
    eventMeetings as EventMeetingData[],
    userId
  );

  return {
    data,
    meta,
  };
};

export const getEventMeetingByIdService = async (eventMeetingId: string) => {
  const eventMeeting = await getEventMeetingById(eventMeetingId);
  if (!eventMeeting) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.EVENT_MEETING,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return eventMeeting;
};

export const deleteEventMeetingService = async (eventMeetingId: string) => {
  const eventMeeting = await getEventMeetingById(eventMeetingId);
  if (!eventMeeting) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.EVENT_MEETING,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const [deleteMeeting, deleteEM] = await Promise.all([
    deleteMeetingManyByEventMeetingId(eventMeeting.id),
    deleteEventMeeting(eventMeeting.id),
  ]);

  const errValidation = deleteEM instanceof PrismaClientValidationError || deleteMeeting instanceof PrismaClientValidationError
  const errRequest = deleteEM instanceof PrismaClientKnownRequestError || deleteMeeting instanceof PrismaClientKnownRequestError

  if(errValidation || errRequest){
    return new ErrorApp(
      MESSAGES.ERROR.FAILED.EVENT_MEETING,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  return true;
};
