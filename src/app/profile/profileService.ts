import bcrypt from "bcrypt";
import { decode } from "jsonwebtoken";
import { TokenDecodeInterface } from "../../interface";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import {
  getUserByEmail,
  getUserById,
  getUserByNIM,
} from "../authentication/authRepository";
import { MemberSosmedDTO } from "../members/membersDTO";
import {
  getMemberByNIM,
  updateSosmedMember,
} from "../members/membersRepository";
import { ChangePasswordDTO, ProfileDTO } from "./profileDTO";
import { ProfileDTOMapper, ProfileData } from "./profileMapper";
import { getProfile, updatePassword, updateProfile } from "./profileRepository";
import {
  BUCKET_FOLDER,
  FileType,
  UploadFileToStorage,
} from "../../utils/UploadFileToStorage";
import sharp from "sharp";
import { environment } from "../../libs";

export const getProfileService = async (token: string) => {
  const decodeToken = decode(token);
  if (!(decodeToken as ProfileDTO)?.id) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER_ID,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const profile = await getProfile((decodeToken as ProfileDTO)?.id as string);
  if (!profile) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const result = ProfileDTOMapper(profile as unknown as ProfileData);

  return result;
};

export const updateProfileService = async (
  userId: string,
  {
    email,
    name,
    nim,
    facebook,
    instagram,
    twitter,
    linkedin,
    photo,
  }: ProfileDTO
) => {
  const sosmed = facebook || instagram || twitter || linkedin;
  console.log({
    userId,
  });
  const user = await getUserById(userId);

  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  if (!user?.memberId && sosmed) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ANGGOTA,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  if (nim && user.memberId && user.role === "ANGGOTA") {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NIM_ANGGOTA,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (!user.memberId) {
    const getNIMAnggota = nim ? await getMemberByNIM(nim) : null;
    if (getNIMAnggota) {
      return new ErrorApp(
        MESSAGES.ERROR.ALREADY.USER_NIM,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
    if (nim && nim.length >= 14) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.NIM.LENGTH,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  const getNIM = nim ? await getUserByNIM(nim) : null;
  if (
    getNIM &&
    getNIM.id !== user.id &&
    !user.memberId &&
    user.role === "USER"
  ) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.GLOBAL.NIM,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const getEmail = await getUserByEmail(email as string);
  console.log({
    getEmail,
    email,
  });
  if (email &&getEmail && getEmail.id !== userId) {
    return new ErrorApp(
      MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  let photoName;

  if (photo) {
    const img = photo as Express.Multer.File;
    photoName = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}.webp`;
    const quality = (img?.size as number) > 5 * 1024 * 1024 ? 75 : 100;
    const compress = await sharp(img.buffer).webp({ quality }).toBuffer();

    await UploadFileToStorage({
      Bucket: environment.STORAGE.BUCKET,
      Key: `${environment.STORAGE.BUCKET_FOLDER}/${BUCKET_FOLDER.user}/${photoName}`,
      Body: compress,
      ContentType: FileType["image/webp"],
      ACL: "public-read",
    });
  }

  const profileField: Partial<ProfileDTO> = { id: userId };

  if (name) profileField.name = name;
  if (email) profileField.email = email;
  if (nim) profileField.nim = nim;
  if (photoName) profileField.photo = photoName;

  const sosmedField: Partial<MemberSosmedDTO> = { id: user.memberId as string };
  if (instagram) sosmedField.instagram = instagram;
  if (twitter) sosmedField.twitter = twitter;
  if (linkedin) sosmedField.linkedin = linkedin;
  if (facebook) sosmedField.facebook = facebook;

  if (!user.memberId) {
    const response = await updateProfile(profileField as ProfileDTO);
    return response;
  }
  const [profile, anggota] = await Promise.all([
    updateProfile(profileField as ProfileDTO),
    updateSosmedMember(sosmedField as MemberSosmedDTO),
  ]);

  const sosmedAnggota = {
    instagram: anggota?.instagram,
    linkedin: anggota?.linkedin,
    twitter: anggota?.twitter,
    facebook: anggota?.facebook,
  };
  return { ...profile, ...sosmedAnggota };
};

export const updatePasswordService = async (
  token: string,
  { newPassword, oldPassword }: ChangePasswordDTO
) => {
  const decodeToken = decode(token) as TokenDecodeInterface;
  const id = decodeToken.id;
  const user = await getUserById(id);
  if (!user) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  const match = await bcrypt.compare(oldPassword as string, user.password);
  if (!match) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.USER.PASSWORD,
      401,
      MESSAGE_CODE.UNAUTHORIZED
    );
  }

  if (oldPassword === newPassword) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.NEW_PASSWORD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  const response = await updatePassword({ newPassword: hashPassword, id });
  return response;
};
