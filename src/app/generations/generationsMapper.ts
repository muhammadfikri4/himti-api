import { Generation } from "@prisma/client";

export const generationMapper = (generations: Generation[]) => {
  const data = generations.map((generation) => {
    const now = new Date().getFullYear();

    return {
      id: generation.id,
      year: generation.year,
      isActive: Number(generation.year) <= now - 5 ? false : true,
    };
  });
  return [
    {
      id: "all",
      year: "all",
      isActive: true,
    },
    ...data,
  ];
};
