import { Jabatan } from "@prisma/client";

export interface StrukturalBodyDTO {
    id?: string,
    anggotaId?: string,
    jabatan?: Jabatan,
    image?: string,
    isActive?: boolean
}