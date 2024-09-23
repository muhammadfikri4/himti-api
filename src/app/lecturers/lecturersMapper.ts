import { LecturerDTO } from "./lecturersDTO"

export const dosenMapper = (dosens: LecturerDTO[]): LecturerDTO[] => {
    const mapper = dosens.map((dosen: LecturerDTO) => {
        const { nidn, numberPhone } = dosen
        return {
            ...dosen,
            nidn: Number(nidn),
            numberPhone

        }
    })
    return mapper
}