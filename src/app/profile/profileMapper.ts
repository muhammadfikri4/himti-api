import { Anggota, Point, Role, User } from "@prisma/client";
import { ProfileDTO } from "./profileDTO";

export interface ProfileData extends User {
    Anggota: Anggota
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
        instagram: data?.Anggota?.instagram as string,
        facebook: data?.Anggota?.facebook as string,
        twitter: data?.Anggota?.twitter as string,
        linkedin: data?.Anggota?.linkedin as string,
        totalPoint: point
    }
}