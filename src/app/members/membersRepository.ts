import { Prisma } from "@prisma/client";
import { prisma } from "../../config";
import { MemberBodyDTO, MemberSosmedDTO } from "./membersDTO";
import { IFilterAnggota } from "./membersTypes";

export const getMemberByGenerationId = async (generationId: string) => {
  return await prisma.member.findFirst({
    where: {
      generationId,
    },
  });
};

export const getMembers = async () => {
  return await prisma.member.findMany({
    include: {
      Generation: {
        select: {
          id: true,
          year: true,
          isActive: true,
        },
      },
    },
  });
};

export const getAllMember = async ({
  page,
  perPage,
  search,
  year,
  status,
}: IFilterAnggota) => {
  const filter = {} as {
    OR: Prisma.MemberWhereInput[];
    Generation: Prisma.GenerationWhereInput;
    isActive: boolean;
  };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        User: {
          email: {
            contains: search,
          },
        },
      },
      {
        nim: {
          contains: search,
        },
      },
    ];
  }

  if (year) {
    filter.Generation = {
      year,
    };
  }

  if (typeof status === "boolean") {
    filter.isActive = status;
  }

  return await prisma.member.findMany({
    where: {
      ...filter,
    },

    include: {
      Generation: {
        select: {
          id: true,
          year: true,
          isActive: true,
        },
      },
      User: true,
    },
    orderBy: {
      nim: "desc",
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

export const getMemberCount = async (
  { search, year }: IFilterAnggota,
  status?: boolean
) => {
  const filter = {} as {
    OR: Prisma.MemberWhereInput[];
    Generation: Prisma.GenerationWhereInput;
  };

  if (search) {
    filter.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        User: {
          email: {
            contains: search,
          },
        },
      },
      {
        nim: {
          contains: search,
        },
      },
    ];
  }

  if (year) {
    filter.Generation = {
      year,
    };
  }
  return await prisma.member.count({
    where: { ...filter, isActive: status },
  });
};

export const getMemberByNIM = async (nim: string) => {
  return await prisma.member.findUnique({
    where: {
      nim,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const getMemberByNIMandName = async (name: string) => {
  return await prisma.member.findFirst({
    where: {
      name: {
        contains: name,
      },
    },
  });
};

export const updateMemberNonActive = async () => {
  const now = new Date().getFullYear();
  const fiveYearAgo = now - 5;

  return await prisma.member.updateMany({
    where: {
      Generation: {
        year: fiveYearAgo.toString(),
      },
    },
    data: {
      isActive: false,
    },
  });
};

export const getMemberById = async (id: string) => {
  return await prisma.member.findUnique({
    where: {
      id,
    },
    include: {
      Generation: {
        select: {
          id: true,
          year: true,
        },
      },
    },
  });
};

// export const getMemberByEmail = async (email: string) => {
//     return await prisma.member.findFirst({
//         where: {
//             email
//         }
//     })
// }

export const createMember = async ({
  generationId,
  isActive,
  name,
  nim,
}: MemberBodyDTO) => {
  return await prisma.member.create({
    data: {
      name: name as string,
      nim: nim?.toString() as string,
      generationId: generationId as string,
      isActive,
    },
  });
};

export const deleteMember = async (id: string) => {
  return await prisma.member.delete({
    where: {
      id,
    },
  });
};

export const updateMember = async (data: MemberBodyDTO) => {
  return await prisma.member.update({
    where: {
      id: data.id,
    },
    data,
  });
};

export const updateSosmedMember = async (data: MemberSosmedDTO) => {
  return await prisma.member.update({
    where: {
      id: data.id,
    },
    data,
    select: {
      facebook: true,
      instagram: true,
      linkedin: true,
      twitter: true,
    },
  });
};
