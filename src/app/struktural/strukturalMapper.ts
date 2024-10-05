import { Member, Structural } from "@prisma/client";
import { ImagePath } from "../../utils/ImagePath";

export interface StructuralData extends Structural {
  Member: Member;
}

export const structuralMapper = (data: Structural[]) => {
  return data.map((item) => ({
    ...item,
    jabatan: item.jabatan?.replace(/_/g, " "),
    image: item.image.includes("https")
      ? item.image
      : ImagePath(`struktural/${item.image}`),
  }));
};

export const getStructuralDTOMapper = (data: StructuralData) => {
  return {
    id: data.id,
    jabatan: data.jabatan,
    image: data.image.includes("https") ? data.image : ImagePath(`struktural/${data.image}`),
    memberId: "667ea366768c4c597992623e",
    member: {
      id: data.Member.id,
      name: data.Member.name as string,
      nim: data.Member.nim as string,
    },
    isActive: data.isActive,
    createdAt: data.createdAt,
  };
};
