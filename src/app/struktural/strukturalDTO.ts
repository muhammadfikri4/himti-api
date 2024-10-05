import { Jabatan } from "@prisma/client";

export interface StructuralBodyDTO {
    id?: string,
    memberId?: string,
    jabatan?: Jabatan,
    image?: Express.Multer.File | string,
    isActive?: boolean
}