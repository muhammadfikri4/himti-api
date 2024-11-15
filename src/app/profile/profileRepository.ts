import { prisma } from "../../config";
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO";

export const getProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      nim: true,
      role: true,
      photo: true,
      Member: {
        select: {
          id: true,
          facebook: true,
          instagram: true,
          linkedin: true,
          twitter: true,
        },
      },
      Point: {
        select: {
          point: true,
        },
      },
    },
  });
};

export const updateProfile = async (data: ProfileDTO) => {
  return await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      photo: data.photo ? (data.photo as string) : undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      nim: true,
      role: true,
      photo: true,
    },
  });
};

export const updatePassword = async ({
  newPassword,
  id,
}: ChangePasswordDTO) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      password: newPassword,
    },
  });
};

export const updatePhotoProfile = async (
  userId: string,
  photo?: string | null
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      photo,
    },
  });
};
