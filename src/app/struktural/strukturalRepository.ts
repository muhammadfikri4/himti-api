import { Jabatan } from "@prisma/client";
import { prisma } from "../../config";
import { StructuralBodyDTO } from "./strukturalDTO";
import { IFilterStructural } from "./strukturalTypes";

export const getStructuralById = async (id: string) => {
  return await prisma.structural.findUnique({
    where: {
      id,
    },
    include: {
      Member: {
        select: {
          id: true,
          name: true,
          nim: true,
        },
      },
    },
  });
};

export const deleteStructural = async (id: string) => {
  return await prisma.structural.delete({
    where: {
      id,
    },
  });
};

export const createStructural = async (data: StructuralBodyDTO) => {
  const { memberId, image, isActive, jabatan } = data;

  return await prisma.structural.create({
    data: {
      image: image as string,
      jabatan: jabatan as Jabatan,
      memberId: memberId as string,
      isActive,
    },
  });
};

export const getStructural = async ({
  search,
  page,
  perPage,
  angkatan,
}: IFilterStructural) => {
  return await prisma.structural.findMany({
    where: {
      jabatan: search as Jabatan,
      Member: {
        Generation: {
          year: {
            contains: angkatan,
          },
        },
      },
    },
    include: {
      Member: {
        select: {
          id: true,
          name: true,
          nim: true,
          facebook: true,
          instagram: true,
          linkedin: true,
          twitter: true,
          Generation: {
            select: {
              id: true,
              year: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

export const getStructuralCount = async ({
  search,
  angkatan,
}: IFilterStructural) => {
  return await prisma.structural.count({
    where: {
      jabatan: search as Jabatan,
      Member: {
        Generation: {
          year: {
            contains: angkatan,
          },
        },
      },
    },
  });
};

export const updateStructural = async (data: StructuralBodyDTO) => {
  return await prisma.structural.update({
    where: {
      id: data.id as string,
    },
    data: {
      image: data.image as string,
      jabatan: data.jabatan as Jabatan,
      memberId: data.memberId as string,
      isActive: data.isActive,
    },
  });
};

export const getStructuralByAnggotaId = async (memberId: string) => {
  return await prisma.structural.findFirst({
    where: {
      memberId,
    },
  });
};

export const getStructuralByJabatan = async (jabatan: Jabatan) => {
  return await prisma.structural.findFirst({
    where: {
      jabatan,
    },
  });
};
