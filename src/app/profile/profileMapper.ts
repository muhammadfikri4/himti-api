import { Anggota, User } from "@prisma/client";
import { ProfileDTO } from "./profileDTO";

export interface ProfileData extends User {
    Anggota: Anggota
}

export const ProfileDTOMapper = (data: ProfileData, point: number): ProfileDTO => {
    return {
        id: data.id,
        email: data.email,
        name: data.name,
        nim: data.nim as string,
        instagram: data?.Anggota?.instagram as string,
        facebook: data?.Anggota?.facebook as string,
        twitter: data?.Anggota?.twitter as string,
        linkedin: data?.Anggota?.linkedin as string,
        point
    }
}