import { getMeetingById } from "app/meetings/meetingsRepository"
import { environment } from "../../libs"
import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { FormatIDTime } from "../../utils/FormatIDTime"
import { ErrorApp } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { FileType, UploadFileToStorage } from "../../utils/UploadFileToStorage"
import { addPoint, getPointByAbsensi } from "../point/pointRepository"
import { AttendanceDTO, IFilterAttendance } from "./attendancesDTO"
import { EventMeeting, historyAbsensiMapper } from "./attendancesMapper"
import { createAttendance, getAbsensies, getAllAttendanceByMeetingId, getAttendanceById, getAttendanceByUserId } from "./attendancesRepository"
import { createAttendanceValidate } from "./attendancesValidate"

export const createAttendanceService = async ({ meetingId, image, coordinate, address, attendanceTime }: AttendanceDTO, userId: string) => {

    const validate = await createAttendanceValidate({ meetingId, image, userId, coordinate })

    if (validate instanceof ErrorApp) {
        return validate
    }


    const attendance = await getAllAttendanceByMeetingId(meetingId as string, userId as string)

    if (attendance) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI_ONCE, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const absensiDate = new Date(FormatIDTime(new Date()))
    const meeting = await getMeetingById(meetingId)
    const timeDifference = ((absensiDate?.getTime()) - new Date(meeting?.startTime as Date)?.getTime()) / (1000 * 60 * 60)

    if (timeDifference <= 0) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ABSENSI_NOT_OPEN, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const img = image as Express.Multer.File
    const filename = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}${FileType[img?.mimetype as string]}`

    await UploadFileToStorage({
        Bucket: environment.STORAGE.BUCKET,
        Key: `assets/absensi/${filename}`,
        Body: img?.buffer as Buffer,
        ContentType: img?.mimetype as string,
        ACL: 'public-read',
    })

    const absensi = await createAttendance({
        meetingId: meeting?.id as string,
        image: filename,
        userId,
        coordinate,
        address,
        attendanceTime
    })


    console.log({ timeDifference, targetTime: new Date(FormatIDTime(meeting?.startTime as Date)), absensiDate })

    // Notes: Cek waktu absensi
    let points = 20 // Poin default

    if (timeDifference >= 0 && timeDifference <= 1) {
        points = 100 // Poin untuk absen 3 jam lebih awal
    }
    if (timeDifference >= 1 && timeDifference <= 2) {
        points = 50
    }
    console.log({ points })
    await addPoint(absensi.id, userId, points)
    return
}

export const getAttendanceService = async ({ acaraId }: IFilterAttendance, userId: string) => {
    const acara = await getAttendanceByUserId(userId, acaraId)

    const data = historyAbsensiMapper(acara as unknown as EventMeeting[])

    if (!data.length) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }

    return data
}

export const getAttendanceByIdService = async (id: number) => {
    const attendance = await getAttendanceById(id)

    if (!attendance) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }

    const points = await getPointByAbsensi(attendance?.id as number)
    const response = {
        id: attendance?.id,
        eventMeeting: attendance?.Meeting.EventMeeting.name,
        meeting: attendance?.Meeting?.name,
        user: attendance?.User.name,
        points: points?.point || 0
    }

    if (!response) {
        return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ABSENSI, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return response
}

export const getAttendancesService = async (query: IFilterAttendance) => {

    const { subAcaraId, page, perPage } = query

    const absensies = await getAbsensies(subAcaraId as string, page, perPage)

    return absensies
}