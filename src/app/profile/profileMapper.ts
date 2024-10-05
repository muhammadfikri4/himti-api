import { Member, Point, Role, User } from "@prisma/client";
import { ProfileDTO } from "./profileDTO";
import { ImagePath } from "../../utils/ImagePath";
import { BUCKET_FOLDER } from "../../utils/UploadFileToStorage";

export interface ProfileData extends User {
    Member: Member
    Point: Point[]
}

export const ProfileDTOMapper = (data: ProfileData): ProfileDTO => {
    const point = data.Point?.reduce((a: number, b: Point) => a + b.point, 0)
    return {
        id: data.id,
        email: data.email,
        name: data.name,
        nim: data.nim as string,
        role: data.role as Role,
        photo: data.photo?.includes("https") ? data.photo : ImagePath(`${BUCKET_FOLDER.user}/${data.photo}`),
        instagram: data?.Member?.instagram as string,
        facebook: data?.Member?.facebook as string,
        twitter: data?.Member?.twitter as string,
        linkedin: data?.Member?.linkedin as string,
        totalPoint: point
    }
}