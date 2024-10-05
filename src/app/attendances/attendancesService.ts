import { Meta } from "../../utils/Meta";
import { environment } from "../../libs";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { FormatIDTime } from "../../utils/FormatIDTime";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { FileType, UploadFileToStorage } from "../../utils/UploadFileToStorage";
import { getMeetingById } from "../meetings/meetingsRepository";
import { addPoint } from "../point/pointRepository";
import { AttendanceDTO, FilterAttendance } from "./attendancesDTO";
import {
  AttendanceData,
  EventMeetingData,
  getAttendanceByMeetingMapper,
  getAttendanceDTOMapper,
  historyAbsensiMapper,
} from "./attendancesMapper";
import {
  createAttendance,
  getAttendanceById,
  getAttendanceByMeetingId,
  getAttendanceByUserId,
  getAttendances,
} from "./attendancesRepository";
import { createAttendanceValidate } from "./attendancesValidate";

export const createAttendanceService = async (
  { meetingId, image, coordinate, address, attendanceTime }: AttendanceDTO,
  userId: string
) => {
  const validate = await createAttendanceValidate({
    meetingId,
    image,
    userId,
    coordinate,
  });

  if (validate instanceof ErrorApp) {
    return validate;
  }

  const attendance = await getAttendanceByMeetingId(
    meetingId as string,
    userId as string
  );

  if (attendance) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ABSENSI_ONCE,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const absensiDate = new Date(FormatIDTime(new Date()));
  const meeting = await getMeetingById(meetingId as string);
  const timeDifference =
    (absensiDate?.getTime() - new Date(meeting?.startTime as Date)?.getTime()) /
    (1000 * 60 * 60);

  if (timeDifference <= 0) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ABSENSI_NOT_OPEN,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const img = image as Express.Multer.File;
  const filename = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}${FileType[img?.mimetype as string]}`;

  await UploadFileToStorage({
    Bucket: environment.STORAGE.BUCKET,
    Key: `${environment.STORAGE.BUCKET_FOLDER}/attendance/${filename}`,
    Body: img?.buffer as Buffer,
    ContentType: img?.mimetype as string,
    ACL: "public-read",
  });

  const absensi = await createAttendance({
    meetingId: meeting?.id as string,
    image: filename,
    userId,
    coordinate,
    address,
    attendanceTime,
    eventMeetingId: meeting?.eventMeetingId,
  });

  console.log({
    timeDifference,
    targetTime: new Date(FormatIDTime(meeting?.startTime as Date)),
    absensiDate,
  });

  // Notes: Cek waktu absensi
  let points = 20; // Poin default

  if (timeDifference >= 0 && timeDifference <= 1) {
    points = 100; // Poin untuk absen 3 jam lebih awal
  }
  if (timeDifference >= 1 && timeDifference <= 2) {
    points = 50;
  }
  console.log({ points });
  await addPoint(absensi.id, userId, points);
  return;
};

export const getAttendanceService = async ({
  userId,
  meetingId,
}: FilterAttendance) => {
  const meeting = await getAttendanceByUserId(userId as string, meetingId);

  const data = historyAbsensiMapper(meeting as unknown as EventMeetingData[]);

  if (!data.length) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ABSENSI,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  return data;
};

export const getAttendanceByIdService = async (id: number) => {
  const attendance = await getAttendanceById(id);

  if (!attendance) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ABSENSI,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const data = getAttendanceDTOMapper(
    attendance as unknown as EventMeetingData
  );
  return data;
};

export const getAttendancesService = async (query: FilterAttendance) => {
  const {  page = "1", perPage = "10" } = query;

  const absensies = await getAttendances(query);

  const meta = Meta(Number(page), Number(perPage), absensies.length);

  return {
    data: getAttendanceByMeetingMapper(absensies as unknown as AttendanceData[]),
    meta
  }
};
