import { Jabatan } from "@prisma/client";

export interface StructuralBodyDTO {
    id?: string,
    memberId?: string,
    jabatan?: Jabatan,
    image?: string,
    isActive?: boolean
}