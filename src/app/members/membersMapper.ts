import { Member, Generation, User } from "@prisma/client";
import { ImagePath } from "../../utils/ImagePath";
import { BUCKET_FOLDER } from "../../utils/UploadFileToStorage";

export interface MemberData extends Member {
  Generation: Generation;
  User: User;
}

export const memberMapper = (members: MemberData[]) => {
  const mapper = members.map((member: MemberData) => {
    const {
      id,
      createdAt,
      updatedAt,
      name,
      nim,
      facebook,
      instagram,
      linkedin,
      twitter,
      isActive,
    } = member;
    const sosmed = { facebook, instagram, linkedin, twitter };
    return {
      id,
      nim,
      name,
      email: member?.User?.email ?? null,
      photo: member?.User?.photo
        ? ImagePath(`${BUCKET_FOLDER.user}/${member?.User?.photo}`)
        : null,
      generation: {
        id: member.Generation.id,
        year: member.Generation.year,
      },
      ...sosmed,
      isActive,
      createdAt,
      updatedAt,
    };
  });
  return mapper;
};
