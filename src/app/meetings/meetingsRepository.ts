import { Query } from "interface/Query";
import { prisma } from "../../config";
import {
  FilterMeeting,
  UpdateMeetingBodyRequest,
  type CreateMeetingBodyRequest,
} from "./meetingsDTO";

export const getMeetingById = async (meetingId: string) => {
  return await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      startTime: true,
      endTime: true,
      resume: true,
      eventMeetingId: true,
      Attendance: {
        select: {
          id: true,
          userId: true,
        },
      },
      EventMeeting: true,
    },
  });
};

export const createMeeting = async ({
  name,
  description,
  startTime,
  endTime,
  eventMeetingId,
}: CreateMeetingBodyRequest) => {
  return await prisma.meeting.create({
    data: {
      name,
      description,
      startTime,
      endTime,
      eventMeetingId,
    },
    select: {
      id: true,
    },
  });
};

export const getMeetingByEventMeetingId = async (
  eventMeetingId: string,
  name: string
) => {
  return await prisma.meeting.findFirst({
    where: {
      eventMeetingId,
      name,
    },
  });
};

export const getMeetingsByEventMeetingId = async (query: FilterMeeting) => {
  const { page = "1", perPage = "10", eventMeetingId } = query;
  return await prisma.meeting.findMany({
    where: {
      eventMeetingId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      startTime: true,
      endTime: true,
      EventMeeting: {
        select: {
          id: true,
          name: true,
        },
      },
      Attendance: {
        select: {
          User: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Number(perPage),
    skip: (Number(page) - 1) * Number(perPage),
  });
};

export const getMeetingsByEventMeetingIdCount = async (
  query: FilterMeeting
) => {
  const { eventMeetingId } = query;
  return await prisma.meeting.count({
    where: {
      eventMeetingId,
    },
  });
};

export const getMeetings = async (query: Query) => {
  const { page = "1", perPage = "10", search } = query;
  return await prisma.meeting.findMany({
    where: {
      EventMeeting: {
        name: {
          contains: search,
        },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      startTime: true,
      endTime: true,
      eventMeetingId: true,
      EventMeeting: {
        select: {
          id: true,
          name: true,
        },
      },
      Attendance: {
        select: {
          User: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Number(perPage),
    skip: (Number(page) - 1) * Number(perPage),
  });
};

export const getMeetingsCount = async (query: Query) => {
  const { search } = query;
  return await prisma.meeting.count({
    where: {
      EventMeeting: {
        name: {
          contains: search,
        },
      },
    },
  });
};

export const updateMeeting = async (data: UpdateMeetingBodyRequest) => {
  return await prisma.meeting.update({
    where: {
      id: data.meetingId,
    },
    data: {
      name: data.name,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });
};
